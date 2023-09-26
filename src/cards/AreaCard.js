import {AbstractCard} from "cards/AbstractCard";

/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default options of the card.
   *
   * @type {areaCardOptions}
   * @private
   */
  #defaultOptions = {
    type: "custom:room-card",
    title: undefined,
    icon: "mdi:texture-box",
    icon_color: "blue",
    tap_action: {
      action: "navigate",
      navigation_path: undefined,
    },
    hold_action: {
      action: "none",
    },
    entities: [
      {
        "show_icon": true,
        "show_state": true,
        "show_name": false,
        "icon": {
          "conditions": [
            {
              "condition": "above",
              "value": 0,
              "styles": {
                "color": "yellow"
              }
            }
          ]
        }
      }
    ]
  };

  /**
   * Class constructor.
   *
   * @param {areaEntity} area The area entity to create a card for.
   * @param {areaCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area, options = {}) {
    super(area);
    this.#defaultOptions.title                      = area.name;
    this.#defaultOptions.tap_action.navigation_path = area.area_id ?? area.name;
    this.#defaultOptions.entities[0].entity         = `sensor.${area.area_id}_lights_on`;

    this.mergeOptions(
        this.#defaultOptions,
        options,
    );

    // Override the area's name with a custom name, unless a custom primary text is set.
    if (!options.title && options.name) {
      this.options.title = options.name;
    }
  }
}

export {AreaCard};
