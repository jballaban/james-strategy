/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Helper.js":
/*!***********************!*\
  !*** ./src/Helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Helper: () => (/* binding */ Helper)
/* harmony export */ });
/* harmony import */ var _optionDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./optionDefaults */ "./src/optionDefaults.js");


/**
 * Helper Class
 *
 * Contains the objects of Home Assistant's registries and helper methods.
 */
class Helper {
  /**
   * An array of entities from Home Assistant's entity registry.
   *
   * @type {hassEntity[]}
   * @private
   */
  static #entities;
  /**
   * An array of entities from Home Assistant's device registry.
   *
   * @type {deviceEntity[]}
   * @private
   */
  static #devices;
  /**
   * An array of entities from Home Assistant's area registry.
   *
   * @type {areaEntity[]}
   * @private
   */
  static #areas = [];
  /**
   * An array of state entities from Home Assistant's Hass object.
   *
   * @type {hassObject["states"]}
   * @private
   */
  static #hassStates;

  /**
   * Indicates whether this module is initialized.
   *
   * @type {boolean} True if initialized.
   * @private
   */
  static #initialized = false;

  /**
   * The Custom strategy configuration.
   *
   * @type {customStrategyOptions | {}}
   * @private
   */
  static #strategyOptions = {};

  /**
   * Set to true for more verbose information in the console.
   *
   * @type {boolean}
   */
  static debug = _optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.debug;

  /**
   * Class constructor.
   *
   * This class shouldn't be instantiated directly. Instead, it should be initialized with method initialize().
   * @throws {Error} If trying to instantiate this class.
   */
  constructor() {
    throw new Error("This class should be invoked with method initialize() instead of using the keyword new!");
  }

  /**
   * Custom strategy configuration.
   *
   * @returns {customStrategyOptions|{}}
   * @static
   */
  static get strategyOptions() {
    return this.#strategyOptions;
  }

  /**
   * @returns {areaEntity[]}
   * @static
   */
  static get areas() {
    return this.#areas;
  }

  /**
   * @returns {deviceEntity[]}
   * @static
   */
  static get devices() {
    return this.#devices;
  }

  /**
   * @returns {hassEntity[]}
   * @static
   */
  static get entities() {
    return this.#entities;
  }

  /**
   * @returns {boolean}
   * @static
   */
  static get debug() {
    return this.debug;
  }

  /**
   * Initialize this module.
   *
   * @param {dashBoardInfo | viewInfo} info Strategy information object.
   * @returns {Promise<void>}
   * @static
   */
  static async initialize(info) {
    this.#hassStates = info.hass.states;

    try {
      // Query the registries of Home Assistant.
      [this.#entities, this.#devices, this.#areas] = await Promise.all([
        info.hass.callWS({type: "config/entity_registry/list"}),
        info.hass.callWS({type: "config/device_registry/list"}),
        info.hass.callWS({type: "config/area_registry/list"}),
      ]);
    } catch (e) {
      console.error(Helper.debug ? e : "An error occurred while querying Home assistant's registries!");
    }

    // Cloning is required for the purpose of the required undisclosed area.
    this.#strategyOptions = structuredClone(info.config.strategy.options || {});
    this.debug            = this.#strategyOptions.debug;

    // Setup required configuration entries.
    // TODO: Refactor to something smarter than repeating code for areas, views and domains.
    this.#strategyOptions.areas   = this.#strategyOptions.areas ?? {};
    this.#strategyOptions.views   = this.#strategyOptions.views ?? {};
    this.#strategyOptions.domains = this.#strategyOptions.domains ?? {};

    // Setup and add the undisclosed area if not hidden in the strategy options.
    if (!this.#strategyOptions.areas.undisclosed?.hidden) {
      this.#strategyOptions.areas.undisclosed = {
        ..._optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.areas.undisclosed,
        ...this.#strategyOptions.areas.undisclosed,
      };

      // Make sure the area_id of the custom undisclosed area remains null.
      this.#strategyOptions.areas.undisclosed.area_id = null;

      this.#areas.push(this.#strategyOptions.areas.undisclosed);
    }

    // Merge custom areas of the strategy options into hass areas.
    this.#areas = Helper.areas.map(area => {
      return {...area, ...this.#strategyOptions.areas[area.area_id ?? "undisclosed"]};
    });

    // Sort hass areas by order first and then by name.
    this.#areas.sort((a, b) => {
      return (a.order ?? Infinity) - (b.order ?? Infinity) || a.name.localeCompare(b.name);
    });

    // Merge the views of the strategy options and the default views.
    for (const view of Object.keys(_optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.views)) {
      this.#strategyOptions.views[view] = {
        ..._optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.views[view],
        ...(this.#strategyOptions.views[view]),
      };
    }

    // Sort views of the strategy options by order first and then by title.
    this.#strategyOptions.views = Object.fromEntries(
        Object.entries(this.#strategyOptions.views).sort(([, a], [, b]) => {
          return (a.order ?? Infinity) - (b.order ?? Infinity) || a.title?.localeCompare(b.title);
        }),
    );

    // Merge the domains of the strategy options and the default domains.
    for (const domain of Object.keys(_optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.domains)) {
      this.#strategyOptions.domains[domain] = {
        ..._optionDefaults__WEBPACK_IMPORTED_MODULE_0__.optionDefaults.domains[domain],
        ...(this.#strategyOptions.domains[domain]),
      };
    }

    // Sort domains of the strategy options by order first and then by title.
    this.#strategyOptions.domains = Object.fromEntries(
        Object.entries(this.#strategyOptions.domains).sort(([, a], [, b]) => {
          return (a.order ?? Infinity) - (b.order ?? Infinity) || a.title?.localeCompare(b.title);
        }),
    );

    this.#initialized = true;
  }

  /**
   * Get the initialization status of the Helper class.
   *
   * @returns {boolean} True if this module is initialized.
   * @static
   */
  static isInitialized() {
    return this.#initialized;
  }

  /**
   * Get a template string to define the number of a given domain's entities with a certain state.
   *
   * States are compared against a given value by a given operator.
   *
   * @param {string} domain The domain of the entities.
   * @param {string} operator The Comparison operator between state and value.
   * @param {string} value The value to which the state is compared against.
   *
   * @return {string} The template string.
   * @static
   */
  static getCountTemplate(domain, operator, value) {
    // noinspection JSMismatchedCollectionQueryUpdate (False positive per 17-04-2023)
    /**
     * Array of entity state-entries, filtered by domain.
     *
     * Each element contains a template-string which is used to access home assistant's state machine (state object) in
     * a template.
     * E.g. "states['light.kitchen']"
     *
     * The array excludes hidden and disabled entities.
     *
     * @type {string[]}
     */
    const states = [];

    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    // Get the ID of the devices which are linked to the given area.
    for (const area of this.#areas) {
      const areaDeviceIds = this.#devices.filter(device => {
        return device.area_id === area.area_id;
      }).map(device => {
        return device.id;
      });

      // Get the entities of which all conditions of the callback function are met. @see areaFilterCallback.
      const newStates = this.#entities.filter(
          this.#areaFilterCallback, {
            area: area,
            domain: domain,
            areaDeviceIds: areaDeviceIds,
          })
          .map(entity => `states['${entity.entity_id}']`);

      states.push(...newStates);
    }

    return `{% set entities = [${states}] %} {{ entities | selectattr('state','${operator}','${value}') | list | count }}`;
  }

  /**
   * Callback function for filtering entities.
   *
   * Entities of which all the conditions below are met are kept:
   * 1. Or/Neither the entity's linked device (if any) or/nor the entity itself is lined to the given area.
   *    (See variable areaMatch)
   * 2. The entity's domain matches the given domain.
   * 3. The entity is not hidden and is not disabled.
   *
   * @param {hassEntity} entity The current hass entity to evaluate.
   * @this {areaFilterContext}
   *
   * @return {boolean} True to keep the entity.
   * @static
   */
  static #areaFilterCallback(entity) {
    const areaMatch = this.area.area_id
        // Area is a hass entity; The entity's linked device or the entity itself is linked to the given area.
        ? this.areaDeviceIds.includes(entity.device_id) || entity.area_id === this.area.area_id
        // Undisclosed area; Neither the entity's linked device (if any), nor the entity itself is linked to any area.
        : (this.areaDeviceIds.includes(entity.device_id) || !entity.device_id) && !entity.area_id;

    return (
        areaMatch
        && entity.entity_id.startsWith(`${this.domain}.`)
        && entity.hidden_by == null && entity.disabled_by == null
    );
  }

  /**
   * Get device entities from the entity registry, filtered by area and domain.
   *
   * The entity registry is a registry where Home-Assistant keeps track of all entities.
   * A device is represented in Home Assistant via one or more entities.
   *
   * The result excludes hidden and disabled entities.
   *
   * @param {areaEntity} area Area entity.
   * @param {string} domain The domain of the entity-id.
   *
   * @return {hassEntity[]} Array of device entities.
   * @static
   */
  static getDeviceEntities(area, domain) {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    // Get the ID of the devices which are linked to the given area.
    const areaDeviceIds = this.#devices.filter(device => {
      return device.area_id === area.area_id;
    }).map(device => {

      return device.id;
    });

    // Return the entities of which all conditions of the callback function are met. @see areaFilterCallback.
    return this.#entities.filter(
        this.#areaFilterCallback, {
          area: area,
          domain: domain,
          areaDeviceIds: areaDeviceIds,
        })
        .sort((a, b) => {
          /** @type hassEntity */
          return a.original_name?.localeCompare(b.original_name);
        });
  }

  /**
   * Get state entities, filtered by area and domain.
   *
   * The result excludes hidden and disabled entities.
   *
   * @param {areaEntity} area Area entity.
   * @param {string} domain Domain of the entity-id.
   *
   * @return {stateObject[]} Array of state entities.
   */
  static getStateEntities(area, domain) {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    const states = [];

    // Create a map for the hassEntities and devices {id: object} to improve lookup speed.
    /** @type {Object<string, hassEntity>} */
    const entityMap = Object.fromEntries(this.#entities.map(entity => [entity.entity_id, entity]));
    /** @type {Object<string, deviceEntity>} */
    const deviceMap = Object.fromEntries(this.#devices.map(device => [device.id, device]));

    // Get states whose entity-id starts with the given string.
    const stateEntities = Object.values(this.#hassStates).filter(
        state => state.entity_id.startsWith(`${domain}.`),
    );

    for (const state of stateEntities) {
      const hassEntity = entityMap[state.entity_id];
      const device     = deviceMap[hassEntity?.device_id];

      // Collect states of which any (whichever comes first) of the conditions below are met:
      // 1. The linked entity is linked to the given area.
      // 2. The entity is linked to a device, and the linked device is linked to the given area.
      if (
          (hassEntity?.area_id === area.area_id)
          || (device && device.area_id === area.area_id)
      ) {
        states.push(state);
      }
    }

    return states;
  }

  /**
   * Sanitize a classname.
   *
   * The name is sanitized by capitalizing the first character of the name or after an underscore.
   * Underscores are removed.
   *
   * @param {string} className Name of the class to sanitize.
   * @returns {string} The sanitized classname.
   */
  static sanitizeClassName(className) {
    className = className.charAt(0).toUpperCase() + className.slice(1);

    return className.replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace("-", "")
            .replace("_", ""),
    );
  }

  /**
   * Get the keys of nested objects by its property value.
   *
   * @param {Object<Object>} object An object of objects.
   * @param {string|number} property The name of the property to evaluate.
   * @param {*} value The value which the property should match.
   *
   * @return {string[]|number[]} An array with keys.
   */
  static #getObjectKeysByPropertyValue(object, property, value) {
    const keys = [];

    for (const key of Object.keys(object)) {
      if (object[key][property] === value) {
        keys.push(key);
      }
    }

    return keys;
  }

  /**
   * Get the ids of the views which aren't set to hidden in the strategy options.
   *
   * @return {string[]} An array of view ids.
   */
  static getExposedViewIds() {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    return this.#getObjectKeysByPropertyValue(this.#strategyOptions.views, "hidden", false);
  }

  /**
   * Get the ids of the domain ids which aren't set to hidden in the strategy options.
   *
   * @return {string[]} An array of domain ids.
   */
  static getExposedDomainIds() {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    return this.#getObjectKeysByPropertyValue(this.#strategyOptions.domains, "hidden", false);
  }
}




/***/ }),

/***/ "./src/cards/AbstractCard.js":
/*!***********************************!*\
  !*** ./src/cards/AbstractCard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractCard: () => (/* binding */ AbstractCard)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helper */ "./src/Helper.js");


/**
 * Abstract Card Class
 *
 * To create a new card, extend the new class with this one.
 *
 * @class
 * @abstract
 */
class AbstractCard {
  /**
   * Entity to create the card for.
   *
   * @type {hassEntity | areaEntity}
   */
  entity;

  /**
   * Options for creating a card.
   *
   * @type {abstractOptions}
   */
  options = {
    type: "custom:mushroom-entity-card",
    icon: "mdi:help-circle",
    double_tap_action: {
      action: null,
    },
  };

  /**
   * Class constructor.
   *
   * @param {hassEntity | areaEntity} entity The hass entity to create a card for.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity) {
    if (this.constructor === AbstractCard) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if (!_Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    this.entity = entity;
  }

  /**
   * Merge the default options of this class and the custom options into the options of the parent class.
   *
   * @param {Object} [defaultOptions={}] Default options for the card.
   * @param {Object} [customOptions={}] Custom Options for the card.
   */
  mergeOptions(defaultOptions, customOptions) {
    this.options = {
      ...this.options,
      ...defaultOptions,
      ...customOptions,
    };

    try {
      this.options.double_tap_action.target.entity_id = this.entity.entity_id;
    } catch { }
  }

  /**
   * Get a card for an entity.
   *
   * @return {abstractOptions & Object} A card object.
   */
  getCard() {
    return {
      entity: this.entity.entity_id,
      ...this.options,
    };
  }
}




/***/ }),

/***/ "./src/cards/AreaCard.js":
/*!*******************************!*\
  !*** ./src/cards/AreaCard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AreaCard: () => (/* binding */ AreaCard)
/* harmony export */ });
/* harmony import */ var _AbstractCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCard */ "./src/cards/AbstractCard.js");


/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends _AbstractCard__WEBPACK_IMPORTED_MODULE_0__.AbstractCard {
  /**
   * Default options of the card.
   *
   * @type {areaCardOptions}
   * @private
   */
  #defaultOptions = {
    type: "custom:mushroom-template-card",
    primary: undefined,
    icon: "mdi:texture-box",
    icon_color: "blue",
    tap_action: {
      action: "navigate",
      navigation_path: undefined,
    },
    hold_action: {
      action: "none",
    },
  };

  /**
   * Class constructor.
   *
   * @param {areaEntity} area The area entity to create a card for.
   * @param {areaCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area, options = {}) {
    super(area);
    this.#defaultOptions.primary                    = area.name;
    this.#defaultOptions.tap_action.navigation_path = area.area_id ?? area.name;

    this.mergeOptions(
        this.#defaultOptions,
        options,
    );

    // Override the area's name with a custom name, unless a custom primary text is set.
    if (!options.primary && options.name) {
      this.options.primary = options.name;
    }
  }
}




/***/ }),

/***/ "./src/cards/TitleCard.js":
/*!********************************!*\
  !*** ./src/cards/TitleCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleCard: () => (/* binding */ TitleCard)
/* harmony export */ });
/**
 * Title Card class.
 *
 * Used for creating a Title Card.
 *
 * @class
 */
class TitleCard {
  /**
   * @type {string[]} An array of area ids.
   * @private
   */
  #areaIds;

  /**
   * @type {titleCardOptions}
   * @private
   */
  #options = {
    title: undefined,
    subtitle: undefined,
    showControls: true,
    iconOn: "mdi:power-on",
    iconOff: "mdi:power-off",
    onService: "none",
    offService: "none",
  };

  /**
   * Class constructor.
   *
   * @param {areaEntity[]} areas An array of area entities.
   * @param {titleCardOptions} options Title Card options.
   */
  constructor(areas, options = {}) {
    this.#areaIds = areas.map(area => area.area_id).filter(area_id => area_id);
    this.#options = {
      ...this.#options,
      ...options,
    };
  }

  /**
   * Create a Title card.
   *
   * @return {Object} A Title card.
   */
  createCard() {
    /** @type {Object[]} */
    const cards = [
      {
        type: "custom:mushroom-title-card",
        title: this.#options.title,
        subtitle: this.#options.subtitle,
      },
    ];

    if (this.#options.showControls) {
      cards.push({
        type: "horizontal-stack",
        cards: [
          {
            type: "custom:mushroom-template-card",
            icon: this.#options.iconOff,
            layout: "vertical",
            icon_color: "red",
            tap_action: {
              action: "call-service",
              service: this.#options.offService,
              target: {
                area_id: this.#areaIds,
              },
              data: {},
            },
          },
          {
            type: "custom:mushroom-template-card",
            icon: this.#options.iconOn,
            layout: "vertical",
            icon_color: "amber",
            tap_action: {
              action: "call-service",
              service: this.#options.onService,
              target: {
                area_id: this.#areaIds,
              },
              data: {},
            },
          },
        ],
      });
    }

    return {
      type: "horizontal-stack",
      cards: cards,
    };
  }
}




/***/ }),

/***/ "./src/cards lazy recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./src/cards/ lazy ^\.\/.*$ namespace object ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./AbstractCard": [
		"./src/cards/AbstractCard.js",
		"main"
	],
	"./AbstractCard.js": [
		"./src/cards/AbstractCard.js",
		"main"
	],
	"./AreaCard": [
		"./src/cards/AreaCard.js",
		"main"
	],
	"./AreaCard.js": [
		"./src/cards/AreaCard.js",
		"main"
	],
	"./TitleCard": [
		"./src/cards/TitleCard.js"
	],
	"./TitleCard.js": [
		"./src/cards/TitleCard.js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/cards lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/optionDefaults.js":
/*!*******************************!*\
  !*** ./src/optionDefaults.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   optionDefaults: () => (/* binding */ optionDefaults)
/* harmony export */ });
const optionDefaults = {
  debug: true,
  views: {
    home: {
      order: 1,
      hidden: false,
    }
  }, areas: {
    undisclosed: {
      aliases: [],
      area_id: null,
      name: "Undisclosed",
      picture: null,
      hidden: false,
    }
  }, domains: {
    default: {
      title: "Miscellaneous",
      showControls: false,
      hidden: false,
    },
    light: {
      title: "Lights",
      showControls: true,
      iconOn: "mdi:lightbulb",
      iconOff: "mdi:lightbulb-off",
      onService: "light.turn_on",
      offService: "light.turn_off",
      hidden: false,
    },
  }
}

/***/ }),

/***/ "./src/views/AbstractView.js":
/*!***********************************!*\
  !*** ./src/views/AbstractView.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractView: () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helper */ "./src/Helper.js");
/* harmony import */ var _cards_TitleCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cards/TitleCard */ "./src/cards/TitleCard.js");



/**
 * Abstract View Class.
 *
 * To create a new view, extend the new class with this one.
 *
 * @class
 * @abstract
 */
class AbstractView {
  /**
   * Options for creating a view.
   *
   * @type {abstractOptions}
   */
  options = {
    title: null,
    path: null,
    icon: "mdi:view-dashboard",
    subview: false,
  };

  /**
   * A card to switch all entities in the view.
   *
   * @type {Object}
   */
  viewTitleCard;

  /**
   * Class constructor.
   *
   * @throws {Error} If trying to instantiate this class.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor() {
    if (this.constructor === AbstractView) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if (!_Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }
  }

  /**
   * Merge the default options of this class and the custom options into the options of the parent class.
   *
   * @param {Object} [defaultOptions={}] Default options for the card.
   * @param {Object} [customOptions={}] Custom Options for the card.
   */
  mergeOptions(defaultOptions, customOptions) {
    this.options = {
      ...defaultOptions,
      ...customOptions,
    };
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Object[] | Promise} An array of card objects.
   */
  async createViewCards() {
    /** @type Object[] */
    const viewCards      = [this.viewTitleCard];

    // Create cards for each area.
    for (const area of _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.areas) {
      const areaCards  = [];
      const entities   = _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.getDeviceEntities(area, this["domain"]);
      const className  = _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.sanitizeClassName(this["domain"] + "Card");
      const cardModule = await __webpack_require__("./src/cards lazy recursive ^\\.\\/.*$")(`./${className}`);

      // Create a card for each domain-entity of the current area.
      for (const entity of entities) {
        let cardOptions = _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.strategyOptions.card_options?.[entity.entity_id] ?? {};

        if (cardOptions.hidden) {
          continue;
        }

        areaCards.push(new cardModule[className](entity, cardOptions).getCard());
      }

      if (areaCards.length) {
        // Create a Title card for the current area if it has entities.
        areaCards.unshift(new _cards_TitleCard__WEBPACK_IMPORTED_MODULE_1__.TitleCard(
            [area],
            {
              title: area.name,
              ...this.options["titleCard"],
            },
            this["domain"],
        ).createCard());

        viewCards.push({
          type: "vertical-stack",
          cards: areaCards,
        });
      }
    }

    viewCards.unshift(viewCards.length ? this.viewTitleCard : {
      type: "custom:mushroom-title-card",
      title: "No Entities Available",
      subtitle: "They're either hidden by the configuration or by Home Assistant.",
    });

    return viewCards;
  }

  /**
   * Get a view object.
   *
   * The view includes the cards which are created by method createViewCards().
   *
   * @returns {viewOptions & {cards: Object[]}} The view object.
   */
  async getView() {
    return {
      ...this.options,
      cards: await this.createViewCards(),
    };
  }
}




/***/ }),

/***/ "./src/views/HomeView.js":
/*!*******************************!*\
  !*** ./src/views/HomeView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeView: () => (/* binding */ HomeView)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helper */ "./src/Helper.js");
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractView */ "./src/views/AbstractView.js");



/**
 * Home View Class.
 *
 * Used to create a Home view.
 *
 * @class HomeView
 * @extends AbstractView
 */
class HomeView extends _AbstractView__WEBPACK_IMPORTED_MODULE_1__.AbstractView {
  /**
   * Default options for the view.
   * 
   * @type {viewOptions}
   * @private
   */
  #defaultOptions = {
    title: "Home",
    path: "home",
    subview: false,
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options = {}) {
    super();
    this.mergeOptions(
        this.#defaultOptions,
        options,
    );
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Promise} A promise of a card object array.
   * @override
   */
  async createViewCards() {
    return await Promise.all([
      this.#createAreaCards(),
    ]).then(([areaCards]) => {
      const options       = _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.strategyOptions;
      const homeViewCards = [
        {
          type: "custom:mushroom-template-card",
          primary: "{% set time = now().hour %} {% if (time >= 18) %} Good Evening, {{user}}! {% elif (time >= 12) %} Good Afternoon, {{user}}! {% elif (time >= 5) %} Good Morning, {{user}}! {% else %} Hello, {{user}}! {% endif %}",
          icon: "mdi:hand-wave",
          icon_color: "orange",
          tap_action: {
            action: "none",
          },
          double_tap_action: {
            action: "none",
          },
          hold_action: {
            action: "none",
          },
        },
      ];

      // Add area cards.
      homeViewCards.push({
            type: "custom:mushroom-title-card",
            title: "Areas",
          },
          {
            type: "vertical-stack",
            cards: areaCards,
          });

      return homeViewCards;
    });
  }

  /**
   * Create the area cards to include in the view.
   *
   * Area cards are grouped into two areas per row.
   *
   * @return {Object[]} A card object array.
   */
  #createAreaCards() {
    const groupedCards = [];

    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../cards/AreaCard */ "./src/cards/AreaCard.js")).then(areaModule => {
      const areaCards = [];

      for (const area of _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.areas) {
        if (!_Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.strategyOptions.areas[area.area_id]?.hidden) {
          areaCards.push(
              new areaModule.AreaCard(area, _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.strategyOptions.areas[area.area_id ?? "undisclosed"]).getCard());
        }
      }

      // Horizontally group every two area cards.
      for (let i = 0; i < areaCards.length; i += 2) {
        groupedCards.push({
          type: "horizontal-stack",
          cards: areaCards.slice(i, i + 2),
        });
      }
    });

    return groupedCards;
  }
}




/***/ }),

/***/ "./src/views lazy recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./src/views/ lazy ^\.\/.*$ namespace object ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./AbstractView": [
		"./src/views/AbstractView.js",
		"main"
	],
	"./AbstractView.js": [
		"./src/views/AbstractView.js",
		"main"
	],
	"./HomeView": [
		"./src/views/HomeView.js",
		"main"
	],
	"./HomeView.js": [
		"./src/views/HomeView.js",
		"main"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/views lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/james-strategy.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/Helper.js");


class JamesStrategy {

  static async generateDashboard(info) {
    await _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.initialize(info);
    
    // Create views.
    const views = [];

    let viewModule;

    for (let viewId of _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.getExposedViewIds()) {
      try {
        const viewType = _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.sanitizeClassName(viewId + "View");
        viewModule     = await __webpack_require__("./src/views lazy recursive ^\\.\\/.*$")(`./${viewType}`);
        console.log(viewModule);
        console.log(viewId);
        const view     = await new viewModule[viewType](_Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.strategyOptions.views[viewId]).getView();

        views.push(view);

      } catch (e) {
        console.error(_Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.debug ? e : `View '${viewId}' couldn't be loaded!`);
      }
    }

    return {
      views: views,
    };
  }
}

customElements.define("ll-strategy-james-strategy", JamesStrategy);
})();

/******/ })()
;
//# sourceMappingURL=james-strategy.js.map