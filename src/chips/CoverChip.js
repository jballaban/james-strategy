import {Helper} from "Helper";

class CoverChip {
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
      icon: "mdi:blinds",
      icon_color: "cyan",
      content: Helper.getCountTemplate("cover", "eq", "open"),
      tap_action: {
        action: "navigate",
        navigation_path: "covers",
      },
    };
  }
}

export {CoverChip};
