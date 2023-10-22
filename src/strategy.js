import {settings} from "settings.js";

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

		for (let viewName of settings.views) {
			const viewModule = await import(`views/${viewName}.js`);
			let view = await new viewModule[viewName]().generateView(info);
			views.push(view);
		}

		return {
			title: "Generated Dashboard",
			views: views
		};
	}

	static async generateView(info) {
		const viewModule = await import(`views/${info.view.strategy.options.name}.js`);
		let cards = await new viewModule[info.view.strategy.options.name]().generateCards(info);
		return {
			"cards": cards
		}
	}
	
}

customElements.define("ll-strategy-james", JamesStrategy);