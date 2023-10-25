class AutoEntitiesCard {
	
	constructor(state, area_id, domain) {
		this.state = state;
		this.area_id = area_id;
		this.domain = domain;
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
{%- for entity in expand(area_entities('${this.area_id}'))
				 |selectattr('domain','eq','${this.domain.name}')
				 |selectattr('state','eq','${this.state}')
				 |list -%} 
	{{
		{
			'entity': entity.entity_id,
			'name': entity.attributes.friendly_name|replace("${this.area_id} ","")|replace("${this.domain.name}",""),
			${JSON.stringify(this.domain.card).replace(/^\{/,"").replace(/\}$/,"")}
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