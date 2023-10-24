import { AutoEntitiesCard } from "cards/AutoEntitiesCard.js";
import { ChipsCard, EntityChip } from "cards/ChipsCard";
import {settings} from "settings.js";
import { VerticalStackCard } from "cards/VerticalStackCard";

class DevicesView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		return [{
			strategy: {
				type: "custom:james",
				options: { areas, devices, entities, name: "DevicesView", device: "lights", state: "on" },
			},
			title: "Lights",
			path: "lights",
			subview: "true"
		}, {
			strategy: {
				type: "custom:james",
				options: { areas, devices, entities, name: "DevicesView", device: "lights", state: "off" },
			},
			title: "Lights Off",
			path: "lights_off",
			subview: "true"
		}];
	}

	async generateCards(info) {
		let result = [
			new ChipsCard([
				new EntityChip(`sensor.james_lights_on`, "mdi:lightbulb", "yellow", "lights"),
				new EntityChip(`sensor.james_lights_off`, "mdi:lightbulb", "red", "lights_off")
			]).render(info)
		];
		
		let areaCards = [];
		for (let area_id of settings.areas) {
			areaCards.push(new AutoEntitiesCard(info.view.strategy.options.state, area_id).render(info));
		}
		result.push(
			new VerticalStackCard(areaCards).render(info)
		);
		return result;
	}

}

export {DevicesView};