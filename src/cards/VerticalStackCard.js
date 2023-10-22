class VerticalStackCard {
	
	constructor(cards) {
		this.cards = cards;
	}

	render(info) {
		return {
			"type": "vertical-stack",
			"cards": this.cards
		};
	}
}

export {VerticalStackCard};