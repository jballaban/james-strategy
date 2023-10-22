import { AutoEntitiesCard } from "cards/AutoEntitiesCard.js";

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
			new AutoEntitiesCard().render()
		];
	}

}

export {DevicesView};