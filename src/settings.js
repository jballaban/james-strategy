export const settings = {
	debug: true,
	views: [
		"HomeView",
		"DevicesView"
	],
	sensors: [
		{
			"name": "James Lights On",
			"icon": "mdi:lightbulb-group",
			"state": "{{ states.light | selectattr('state','eq','on') | list | count }}"
		}
	]
}