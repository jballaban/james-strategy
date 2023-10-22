class AutoEntitiesCard {
	
	constructor(state, area_id) {
		this.state = state;
		this.area_id = area_id;
	}

	render(info) {
		return {
			"type": "custom:auto-entities",
			"card": {
				"type": "grid",
				"columns": 1,
				"square": false,
				"title": this.area_id
			},
			"card_param": "cards",
			"filter": {
				"include": [
					{
						"domain": "light",
						"state": this.state,
						"area": this.area_id,
						"options": {
							"type": "custom:mushroom-light-card",
							"show_brightness_control": true
						}
					}
				]
			},
			"show_empty": false
		};
	}
}

export {AutoEntitiesCard};