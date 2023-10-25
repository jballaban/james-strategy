import { MarkdownCard } from "cards/MarkdownCard.js";
import { ChipsCard, EntityChip } from "cards/ChipsCard.js";
import { settings } from 'settings.js'

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
			new ChipsCard(
				settings.domains.map(item => {
					return new EntityChip(`sensor.james_${item.name}s_on`, item.icon, "yellow", item.name)
				})
			).render(info),
			new MarkdownCard(`HomeView Generated at ${(new Date).toLocaleString()}`).render(info)
		];
	}

}

export {HomeView};