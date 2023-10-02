import {Helper} from "Helper";
import {AbstractCard} from "cards/AbstractCard";

/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default options of the card.
   *
   * @type {areaCardOptions}
   * @private
   */
  #defaultOptions = {
    type: "custom:room-card",
    title: undefined,
    icon: "mdi:texture-box",
    icon_color: "blue",
    tap_action: {
      action: "navigate",
      navigation_path: undefined,
    },
    hold_action: {
      action: "none",
    },
    entities: []
  };

  #entityOptions = {
    "show_icon": true,
    "show_state": true,
    "show_name": false,
    tap_action: {
      action: "navigate",
      navigation_path: undefined,
    },
    "icon": {
      "conditions": [
        {
          "condition": "above",
          "value": 0,
          "styles": {
            "color": "yellow"
          }
        }
      ]
    }
  }

  /**
   * Class constructor.
   *
   * @param {areaEntity} area The area entity to create a card for.
   * @param {areaCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area, options = {}) {
    super(area);
    this.#defaultOptions.title                      = area.name;
    this.#defaultOptions.tap_action.navigation_path = area.area_id ?? area.name;

    let exposedDomainIds = Helper.getExposedDomainIds();

    for (let domain of exposedDomainIds) {
      if (domain == 'default') continue;
      let entity = {
        ...this.#entityOptions,
        ...{
          "entity": `sensor.${area.area_id}_${domain}s_on`,
          "tap_action": {
            action: "navigate",
            "navigation_path": `${area.area_id ?? area.name}_${domain}`
          }
        }
      }
      this.#defaultOptions.entities.push(entity);
    }

    this.mergeOptions(
        this.#defaultOptions,
        options,
    );

    // Override the area's name with a custom name, unless a custom primary text is set.
    if (!options.title && options.name) {
      this.options.title = options.name;
    }

  }
}

export {AreaCard};
