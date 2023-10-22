class HorizontalStack {
	
	constructor(cards) {
		this.cards = cards;
	}

	render(info) {
		return {
			"type": "horizontal-stack",
			"cards": this.cards
		};
	}
}

export {HorizontalStack};