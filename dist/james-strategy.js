/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cards/AutoEntitiesCard.js":
/*!***************************************!*\
  !*** ./src/cards/AutoEntitiesCard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoEntitiesCard: () => (/* binding */ AutoEntitiesCard)
/* harmony export */ });
class AutoEntitiesCard {
	
	constructor(state, area_id, domain) {
		this.state = state;
		this.area_id = area_id;
		this.domain = domain;
	}

	render(info) {
		let filters = [];
		filters.push(`selectattr('domain','eq','${this.domain.name}')`);
		if (this.state) {
			filters.push(`selectattr('state','eq','${this.state}')`);
		}
		let result = {
			"type": "custom:auto-entities",
			"card": {
				"type": "entities",
				"title": this.area_id
			},
			"filter": {
				"template": `
{%- for entity in expand(area_entities('${this.area_id}'))
				 |${filters.join(`|\n`)}
				 |list -%} 
	{{
		{
			'entity': entity.entity_id,
			'name': entity.attributes.friendly_name|replace("${this.area_id} ","")|replace("${this.domain.name}",""),
			${JSON.stringify(this.domain.card).replace(/^\{/,"").replace(/\}$/,"")}
		}
	}},
{%- endfor -%}`,
			},
			"show_empty": false
		};
		return result;
	}
}



/***/ }),

/***/ "./src/cards/ChipsCard.js":
/*!********************************!*\
  !*** ./src/cards/ChipsCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChipsCard: () => (/* binding */ ChipsCard),
/* harmony export */   EntityChip: () => (/* binding */ EntityChip),
/* harmony export */   TemplateChip: () => (/* binding */ TemplateChip)
/* harmony export */ });
class TemplateChip {
	
	constructor(content, icon) {
		this.content = content;
		this.icon = icon;
	}

	render(info) {
		return {
			"type": "template",
			"content": this.content,
			"icon": this.icon
		};
	}

}

class EntityChip {

	constructor(entity_id, icon, color, path) {
		this.entity_id = entity_id;
		this.icon = icon;
		this.color = color;
		this.path = path;
	}

	render(info) {
		let result = {
			"type": "entity",
			"entity": this.entity_id,
			"icon": this.icon,
			"icon_color": this.color
		};
		if (info.view.path !== this.path) {
			result = {
				...result,
				"tap_action": {
					"action": "navigate",
					"navigation_path": this.path
				}
			}
		}
		return result;
	}

}

class ChipsCard {
	
	constructor(chips) {
		this.chips = chips;
	}

	render(info) {
		return {
			"type": "custom:mushroom-chips-card",
			"chips": this.chips.map(chip => {
				return chip.render(info);
			})
		};
	}
	
}



/***/ }),

/***/ "./src/cards/MarkdownCard.js":
/*!***********************************!*\
  !*** ./src/cards/MarkdownCard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownCard: () => (/* binding */ MarkdownCard)
/* harmony export */ });
class MarkdownCard {
	
	constructor(content) {
		this.content = content;
	}

	render(info) {
		return {
			"type": "markdown",
			"content": this.content
		};
	}
}



/***/ }),

/***/ "./src/cards/VerticalStackCard.js":
/*!****************************************!*\
  !*** ./src/cards/VerticalStackCard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerticalStackCard: () => (/* binding */ VerticalStackCard)
/* harmony export */ });
class VerticalStackCard {
	
	constructor(cards) {
		this.cards = cards;
	}

	render(info) {
		return {
			"type": "vertical-stack",
			"cards": this.cards
		};
	}
}



/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
const settings = {
	"debug": true,
	"levels": [
		{
			"title": "Basement",
			"icon": "mdi:home-floor-negative-1",
			"name": "basement",
			"areas": [
				"Basement Bathroom",
				"Shop",
				"Gym",
				"Basement Hallway",
				"Rec Room"
			]
		}, {
			"title": "Main Floor",
			"icon": "mdi:home-floor-0",
			"name": "main",
			"areas": [
				"Front Foyer",
				"Powder Room",
				"Bay Window",
				"Dining Room",
				"Hallway",
				"Mud Room",
				"Kitchen",
				"Family Room",
				"Garage"
			]
		}, {
			"title": "Upstairs",
			"icon": "mdi:home-floor-1",
			"name": "upstairs",
			"areas": [
				"Upstairs Hallway",
				"Master Bedroom",
				"Master Bathroom",
				"Laundry Room",
				"Office",
				"Lola Bedroom",
				"Lukas Bedroom",
				"Kids Bathroom"
			]
		}, {
			"title": "Outside",
			"icon": "mdi:home-floor-g",
			"name": "outside",
			"areas": [
				"Exterior",
				"Cabana"
			]
		}
	],
	"areas": [
		"Basement Bathroom",
		"Shop",
		"Gym",
		"Basement Hallway",
		"Rec Room",
		"Front Foyer",
		"Powder Room",
		"Bay Window",
		"Dining Room",
		"Hallway",
		"Mud Room",
		"Kitchen",
		"Family Room",
		"Garage",
		"Upstairs Hallway",
		"Master Bedroom",
		"Master Bathroom",
		"Laundry Room",
		"Office",
		"Lola Bedroom",
		"Lukas Bedroom",
		"Kids Bathroom",
		"Exterior",
		"Cabana"
	],
	"views": [
		"HomeView",
		"DevicesView"
	],
	"domains": [
		{ 
			"name": "light", 
			"title": "Lights", 
			"on": "on", 
			"off": "off", 
			"icon": "mdi:lightbulb", 
			"card": {
				"type": "custom:mushroom-light-card",
				"show_brightness_control": true,
				"layout": "horizontal"
			}
		},
		{ 
			"name": "fan", 
			"title": "Fans", 
			"on": "on", 
			"off": "off", 
			"icon": "mdi:fan",
			"card": {
				"type": "custom:mushroom-fan-card"
			}
		},
		{ 
			"name": "cover", 
			"title": "Covers", 
			"on": "open", 
			"off": "closed", 
			"icon": "mdi:blinds",
			"card": {
				"type": "custom:mushroom-cover-card"
			}
		}
	],
	"sensors": [
		{
			"name": "James Lights On",
			"state": "{{ states.light | selectattr('state','eq','on') | list | count }}",
			"domain": "light"
		},
		{
			"name": "James Fans On",
			"state": "{{ states.fan | selectattr('state','eq','on') | list | count }}",
			"domain": "fan"
		},
		{
			"name": "James Covers On",
			"state": "{{ states.cover | selectattr('state','eq','open') | list | count }}",
			"domain": "cover"
		}
	]
}

/***/ }),

/***/ "./src/views/DevicesView.js":
/*!**********************************!*\
  !*** ./src/views/DevicesView.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DevicesView: () => (/* binding */ DevicesView)
/* harmony export */ });
/* harmony import */ var cards_AutoEntitiesCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cards/AutoEntitiesCard.js */ "./src/cards/AutoEntitiesCard.js");
/* harmony import */ var cards_ChipsCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cards/ChipsCard */ "./src/cards/ChipsCard.js");
/* harmony import */ var settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! settings.js */ "./src/settings.js");
/* harmony import */ var cards_VerticalStackCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cards/VerticalStackCard */ "./src/cards/VerticalStackCard.js");





class DevicesView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		let result = [];
		settings_js__WEBPACK_IMPORTED_MODULE_2__.settings.domains.forEach((item) => {
			result.push({
				strategy: {
					type: "custom:james",
					options: { areas, devices, entities, name: "DevicesView", domain: item, state: item.on},
				},
				title: item.title,
				path: item.name,
				icon: item.icon
			});
			settings_js__WEBPACK_IMPORTED_MODULE_2__.settings.levels.forEach((level) => {
				result.push({
					strategy: {
						type: "custom:james",
						options: { areas, devices, entities, name: "DevicesView", domain: item, level: level },
					},
					title: `${level.title} ${item.title}`,
					path: `${level.name}-${item.name}`,
					subview: true
				});
			});
		});
		return result;
	}

	async generateCards(info) {
		let chips = [
			new cards_ChipsCard__WEBPACK_IMPORTED_MODULE_1__.EntityChip(`sensor.james_${info.view.strategy.options.domain.name}s_on`, info.view.strategy.options.domain.icon, "yellow", info.view.strategy.options.domain.name),
		];
		for (let level of settings_js__WEBPACK_IMPORTED_MODULE_2__.settings.levels) {
			chips.push(new cards_ChipsCard__WEBPACK_IMPORTED_MODULE_1__.EntityChip(`sensor.james_${level.name$}_${info.view.strategy.options.domain.name}s_on`, level.icon, info.view.strategy.options.level?.name==level.name ? "green" : "blue", `${level.name}-${info.view.strategy.options.domain.name}`));
		}

		let result = [
			new cards_ChipsCard__WEBPACK_IMPORTED_MODULE_1__.ChipsCard(chips).render(info)
		];
		
		let areaCards = [];
		for (let area_id of settings_js__WEBPACK_IMPORTED_MODULE_2__.settings.areas) {
			if (!info.view.strategy.options.level || info.view.strategy.options.level.areas.includes(area_id))
				areaCards.push(new cards_AutoEntitiesCard_js__WEBPACK_IMPORTED_MODULE_0__.AutoEntitiesCard(info.view.strategy.options.state, area_id, info.view.strategy.options.domain).render(info));
		}
		result.push(
			new cards_VerticalStackCard__WEBPACK_IMPORTED_MODULE_3__.VerticalStackCard(areaCards).render(info)
		);
		return result;
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
/* harmony import */ var cards_MarkdownCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cards/MarkdownCard.js */ "./src/cards/MarkdownCard.js");
/* harmony import */ var cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cards/ChipsCard.js */ "./src/cards/ChipsCard.js");
/* harmony import */ var settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! settings.js */ "./src/settings.js");




class HomeView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		return [{
			strategy: {
				type: "custom:james",
				options: { areas, devices, entities, name: "HomeView" },
			},
			title: "Home",
			path: "home",
			icon: "mdi:home"
		}];
	}

	async generateCards(info) {
		return [
			new cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__.ChipsCard(
				settings_js__WEBPACK_IMPORTED_MODULE_2__.settings.domains.map(item => {
					return new cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__.EntityChip(`sensor.james_${item.name}s_on`, item.icon, "yellow", item.name)
				})
			).render(info),
			new cards_MarkdownCard_js__WEBPACK_IMPORTED_MODULE_0__.MarkdownCard(`HomeView Generated at ${(new Date).toLocaleString()}`).render(info)
		];
	}

}



/***/ }),

/***/ "./src/views/View.js":
/*!***************************!*\
  !*** ./src/views/View.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
class View {

	async generateView(info) {
		const { area, devices, entities } = info.view.strategy.options;
	}
}



/***/ }),

/***/ "./src/views lazy recursive ^\\.\\/.*\\.js$":
/*!*******************************************************!*\
  !*** ./src/views/ lazy ^\.\/.*\.js$ namespace object ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./DevicesView.js": [
		"./src/views/DevicesView.js",
		"main"
	],
	"./HomeView.js": [
		"./src/views/HomeView.js",
		"main"
	],
	"./View.js": [
		"./src/views/View.js",
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
webpackAsyncContext.id = "./src/views lazy recursive ^\\.\\/.*\\.js$";
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
/*!*************************!*\
  !*** ./src/strategy.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! settings.js */ "./src/settings.js");


class JamesStrategy {

	static async generateDashboard(info) {
		// Query all data we need. We will make it available to views by storing it in strategy options.
		const [areas, devices, entities] = await Promise.all([
			info.hass.callWS({ type: "config/area_registry/list" }),
			info.hass.callWS({ type: "config/device_registry/list" }),
			info.hass.callWS({ type: "config/entity_registry/list" }),
		]);
		
		info.view = {
			strategy: {
				options: {
					areas,
					devices,
					entities
				}
			}
		}
		
		let views = [];

		for (let viewName of settings_js__WEBPACK_IMPORTED_MODULE_0__.settings.views) {
			const viewModule = await __webpack_require__("./src/views lazy recursive ^\\.\\/.*\\.js$")(`./${viewName}.js`);
			let subviews = await new viewModule[viewName]().generateViews(info);
			views.push(...subviews);
		}

		return {
			title: "Generated Dashboard",
			views: views
		};
	}

	static async generateView(info) {
		const viewModule = await __webpack_require__("./src/views lazy recursive ^\\.\\/.*\\.js$")(`./${info.view.strategy.options.name}.js`);
		let cards = await new viewModule[info.view.strategy.options.name]().generateCards(info);
		return {
			"cards": cards
		}
	}
	
}

customElements.define("ll-strategy-james", JamesStrategy);
})();

/******/ })()
;
//# sourceMappingURL=james-strategy.js.map