export const settings = {
	debug: true,
	areas: [
		"Basement Bathroom",
		"Shop",
		"Basement Hallway",
		"Rec Room"
	],
	views: [
		"HomeView",
		"DevicesView"
	],
	sensors: [
		{
			"name": "James Lights On",
			"icon": "mdi:lightbulb-group",
			"state": "{{ states.light | selectattr('state','eq','on') | list | count }}"
		},
		{
			"name": "James Lights Off",
			"icon": "mdi:lightbulb-group",
			"state": "{{ states.light | selectattr('state','eq','off') | list | count }}"
		}
	]
}