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

export {ChipsCard, EntityChip};