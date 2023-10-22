class AutoEntitiesCard {
	
	constructor() {}

	render() {
		return {
			"type": "custom:auto-entities",
			"card": {
				"type": "grid",
				"columns": 2,
				"square": false,
			},
			"card_param": "cards",
			"filter": {
				"include": [
					{
						"domain": "light",
						"state": "on",
						"options": {
							"type": "custom:mushroom-light-card",
							"show_brightness_control": true
						}
					}
				]
			}
		};
	}
}

export {AutoEntitiesCard};