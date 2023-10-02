export const optionDefaults = {
  debug: true,
  views: {
    home: {
      order: 1,
      hidden: false,
    }
  }, areas: {
    undisclosed: {
      aliases: [],
      area_id: null,
      name: "Undisclosed",
      picture: null,
      hidden: false,
    }
  }, domains: {
    default: {
      title: "Miscellaneous",
      showControls: false,
      hidden: false,
    },
    light: {
      title: "Lights",
      showControls: true,
      iconOn: "mdi:lightbulb",
      iconOff: "mdi:lightbulb-off",
      onService: "light.turn_on",
      offService: "light.turn_off",
      hidden: false,
    },
    fan: {
      title: "Fans",
      showControls: true,
      iconOn: "mdi:fan",
      iconOff: "mdi:fan-off",
      onService: "fan.turn_on",
      offService: "fan.turn_off",
      hidden: false,
    },
    cover: {
      title: "Covers",
      showControls: true,
      iconOn: "mdi:arrow-up",
      iconOff: "mdi:arrow-down",
      onService: "cover.open_cover",
      offService: "cover.close_cover",
      hidden: false,
    }
  }
}