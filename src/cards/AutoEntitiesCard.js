class AutoEntitiesCard {
	
	constructor(state, area_id) {
		this.state = state;
		this.area_id = area_id;
	}

	render(info) {
		let result = {
			"type": "custom:auto-entities",
			"card": {
				"type": "entities",
				"title": this.area_id
			},
			"filter": {
				"template": `
{%- for light in expand(area_entities('${this.area_id}'))
				 |selectattr('domain','eq','light')
				 |selectattr('state','eq','${this.state}')
				 |list -%} 
	{{
		{
			'entity': light.entity_id,
			'name': light.attributes.friendly_name|replace("${this.area_id} ","")|replace("Lights","")|replace("Light",""),
			'type': 'custom:mushroom-light-card',
			'show_brightness_control': true,
			'layout': 'horizontal'
		}
	}},
{%- endfor -%}`,
			},
			"show_empty": false
		};
		return result;
	}
}

export {AutoEntitiesCard};