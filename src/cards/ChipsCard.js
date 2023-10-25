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

export {ChipsCard, EntityChip, TemplateChip};