/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/views lazy recursive ^\\.\\/.*\\.js$":
/*!**************************************************************!*\
  !*** ./src/views/ lazy ^\.\/.*\.js$ strict namespace object ***!
  \**************************************************************/
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

/***/ }),

/***/ "./src/cards/AutoEntitiesCard.js":
/*!***************************************!*\
  !*** ./src/cards/AutoEntitiesCard.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoEntitiesCard: () => (/* binding */ AutoEntitiesCard)
/* harmony export */ });
class AutoEntitiesCard {
	
	constructor() {}

	render() {
		return {
			"type": "custom:auto-entities",
			"card": {
				"type": "grid",
				"columns": 2,
				"square": false,
			},
			"card_param": "cards",
			"filter": {
				"include": [
					{
						"domain": "light",
						"state": "on",
						"options": {
							"type": "custom:mushroom-light-card",
							"show_brightness_control": true
						}
					}
				]
			}
		};
	}
}



/***/ }),

/***/ "./src/cards/ChipsCard.js":
/*!********************************!*\
  !*** ./src/cards/ChipsCard.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChipsCard: () => (/* binding */ ChipsCard),
/* harmony export */   EntityChip: () => (/* binding */ EntityChip)
/* harmony export */ });
class TemplateChip {
	constructor(content, icon) {
		this.content = content;
		this.icon = icon;
	}

	render() {
		return {
			"type": "template",
			"content": this.content,
			"icon": this.icon
		};
	}
}

class EntityChip {
	constructor(entity_id, icon) {
		this.entity_id = entity_id;
		this.icon = icon;
	}

	render() {
		return {
			"type": "entity",
			"entity": this.entity_id,
			"icon": this.icon
		};
	}
}

class ChipsCard {
	
	constructor(chips) {
		this.chips = chips;
	}

	render() {
		return {
			"type": "custom:mushroom-chips-card",
			"chips": this.chips.map(chip => {
				return chip.render();
			})
		};
	}
	
}



/***/ }),

/***/ "./src/cards/MarkdownCard.js":
/*!***********************************!*\
  !*** ./src/cards/MarkdownCard.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownCard: () => (/* binding */ MarkdownCard)
/* harmony export */ });
class MarkdownCard {
	
	constructor(content) {
		this.content = content;
	}

	render() {
		return {
			"type": "markdown",
			"content": this.content
		};
	}
}



/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
const settings = {
	debug: true,
	views: [
		"HomeView",
		"DevicesView"
	],
	sensors: [
		{
			"name": "James Lights On",
			"icon": "mdi:lightbulb-group",
			"state": "{{ states.light | selectattr('state','eq','on') | list | count }}"
		}
	]
}

/***/ }),

/***/ "./src/views/DevicesView.js":
/*!**********************************!*\
  !*** ./src/views/DevicesView.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DevicesView: () => (/* binding */ DevicesView)
/* harmony export */ });
/* harmony import */ var cards_AutoEntitiesCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cards/AutoEntitiesCard.js */ "./src/cards/AutoEntitiesCard.js");


class DevicesView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		return [{
			strategy: {
				type: "custom:james",
				options: { areas, devices, entities, name: "DevicesView", device: "lights" },
			},
			title: "Lights",
			path: "lights"
		}];
	}

	async generateCards(info) {
		return [
			new cards_AutoEntitiesCard_js__WEBPACK_IMPORTED_MODULE_0__.AutoEntitiesCard().render()
		];
	}

}



/***/ }),

/***/ "./src/views/HomeView.js":
/*!*******************************!*\
  !*** ./src/views/HomeView.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeView: () => (/* binding */ HomeView)
/* harmony export */ });
/* harmony import */ var cards_MarkdownCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cards/MarkdownCard.js */ "./src/cards/MarkdownCard.js");
/* harmony import */ var cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cards/ChipsCard.js */ "./src/cards/ChipsCard.js");



class HomeView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		return [{
			strategy: {
				type: "custom:james",
				options: { areas, devices, entities, name: "HomeView" },
			},
			title: "Home",
			path: "home"
		}];
	}

	async generateCards(info) {
		return [
			new cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__.ChipsCard([
				new cards_ChipsCard_js__WEBPACK_IMPORTED_MODULE_1__.EntityChip("sensor.james_lights_on", "mdi:lightbulb")
			]).render(),
			new cards_MarkdownCard_js__WEBPACK_IMPORTED_MODULE_0__.MarkdownCard(`HomeView Generated at ${(new Date).toLocaleString()}`).render()
		];
	}

}



/***/ }),

/***/ "./src/views/View.js":
/*!***************************!*\
  !*** ./src/views/View.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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