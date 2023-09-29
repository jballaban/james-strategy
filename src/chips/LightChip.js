import {Helper} from "Helper";

class LightChip {
  #areaIds;
  #options = {
    // No default options.
  };

  constructor(areaIds, options = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    this.#areaIds = areaIds.filter(areaId => areaId);
    this.#options = {
      ...this.#options,
      ...options,
    };
  }

  getChip() {
    return {
      type: "template",
      icon: "mdi:lightbulb-group",
      icon_color: "amber",
      content: Helper.getCountTemplate("light", "eq", "on"),
      tap_action: {
        action: "navigate",
        navigation_path: "lights",
      },
    };
  }
}

export {LightChip};
