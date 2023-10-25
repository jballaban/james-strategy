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
			result.push({
				strategy: {
					type: "custom:james",
					options: { areas, devices, entities, name: "DevicesView", domain: item, state: item.off },
				},
				title: `${item.title} Off`,
				path: `${item.name}_off`,
				subview: true
			});
		});
		return result;
	}

	async generateCards(info) {
		let result = [
			new ChipsCard([
				new EntityChip(`sensor.james_${info.view.strategy.options.domain.name}s_on`, info.view.strategy.options.domain.icon, "yellow", info.view.strategy.options.domain.name),
				new EntityChip(`sensor.james_${info.view.strategy.options.domain.name}s_off`, info.view.strategy.options.domain.icon, "red", `${info.view.strategy.options.domain.name}_off`)
			]).render(info)
		];
		
		let areaCards = [];
		for (let area_id of settings.areas) {
			areaCards.push(new AutoEntitiesCard(info.view.strategy.options.state, area_id, info.view.strategy.options.domain).render(info));
		}
		result.push(
			new VerticalStackCard(areaCards).render(info)
		);
		return result;
	}

}

export {DevicesView};