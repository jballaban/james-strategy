export const settings = {
	debug: true,
	areas: [
		"Basement Bathroom",
		"Shop",
		"Gym",
		"Basement Hallway",
		"Rec Room",
		"Front Foyer",
		"Powder Room",
		"Bay Window",
		"Dining Room",
		"Hallway",
		"Mud Room",
		"Kitchen",
		"Family Room",
		"Garage",
		"Upstairs Hallway",
		"Master Bedroom",
		"Master Bathroom",
		"Laundry Room",
		"Office",
		"Lola Bedroom",
		"Lukas Bedroom",
		"Kids Bathroom",
		"Exterior",
		"Cabana"
	],
	views: [
		"HomeView",
		"DevicesView"
	],
	domains: [
		{ 
			name: "light", 
			title: "Lights", 
			on: "on", 
			off: "off", 
			icon: "mdi:lightbulb", 
			card: {
				"type": "custom:mushroom-light-card",
				"show_brightness_control": true,
				"layout": "horizontal"
			}
		},
		{ 
			name: "fan", 
			title: "Fans", 
			on: "on", 
			off: "off", 
			icon: "mdi:fan",
			card: {
				"type": "custom:mushroom-fan-card"
			}
		},
		{ 
			name: "cover", 
			title: "Covers", 
			on: "open", 
			off: "closed", 
			icon: "mdi:blinds",
			card: {
				"type": "custom:mushroom-cover-card"
			}
		},
	],
	sensors: [
		{
			"name": "James Lights On",
			"state": "{{ states.light | selectattr('state','eq','on') | list | count }}"
		},
		{
			"name": "James Lights Off",
			"state": "{{ states.light | selectattr('state','eq','off') | list | count }}"
		},
		{
			"name": "James Fans On",
			"state": "{{ states.fan | selectattr('state','eq','on') | list | count }}"
		},
		{
			"name": "James Fans Off",
			"state": "{{ states.fan | selectattr('state','eq','off') | list | count }}"
		},
		{
			"name": "James Covers On",
			"state": "{{ states.cover | selectattr('state','eq','open') | list | count }}"
		},
		{
			"name": "James Covers Off",
			"state": "{{ states.cover | selectattr('state','eq','closed') | list | count }}"
		}
	]
}