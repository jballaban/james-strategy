import { AutoEntitiesCard } from "cards/AutoEntitiesCard.js";
import { ChipsCard, EntityChip } from "cards/ChipsCard";
import {settings } from "settings.js";
import { VerticalStackCard } from "cards/VerticalStackCard";

class DevicesView {

	async generateViews(info) {
		const { areas, devices, entities } = info.view.strategy.options;
		let result = [];
		settings.domains.forEach((item) => {
			result.push({
				strategy: {
					type: "custom:james",
					options: { areas, devices, entities, name: "DevicesView", domain: item, state: item.on},
				},
				title: item.title,
				path: item.name,
				icon: item.icon
			});
			settings.levels.forEach((level) => {
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
			new EntityChip(`sensor.james_${info.view.strategy.options.domain.name}s_on`, info.view.strategy.options.domain.icon, "yellow", info.view.strategy.options.domain.name),
		];
		for (let level of settings.levels) {
			chips.push(new EntityChip(`sensor.james_${info.view.strategy.options.domain.name}s_on`, level.icon, info.view.strategy.options.level?.name==level.name ? "green" : "blue", `${level.name}-${info.view.strategy.options.domain.name}`));
		}

		let result = [
			new ChipsCard(chips).render(info)
		];
		
		let areaCards = [];
		for (let area_id of settings.areas) {
			if (!info.view.strategy.options.level || info.view.strategy.options.level.areas.includes(area_id))
				areaCards.push(new AutoEntitiesCard(info.view.strategy.options.state, area_id, info.view.strategy.options.domain).render(info));
		}
		result.push(
			new VerticalStackCard(areaCards).render(info)
		);
		return result;
	}

}

export {DevicesView};