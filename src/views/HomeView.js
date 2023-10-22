import { MarkdownCard } from "cards/MarkdownCard.js";
import { ChipsCard, EntityChip } from "cards/ChipsCard.js";

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
			new ChipsCard([
				new EntityChip("sensor.james_lights_on", "mdi:lightbulb")
			]).render(),
			new MarkdownCard(`HomeView Generated at ${(new Date).toLocaleString()}`).render()
		];
	}

}

export {HomeView};