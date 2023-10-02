import {Helper} from "Helper";
import {AbstractView} from "views/AbstractView";

/**
 * Domain View Class.
 *
 * Used to create a Domain view.
 *
 * @class DomainView
 * @extends AbstractView
 */
class DomainView extends AbstractView {
  /**
   * Default options for the view.
   * 
   * @type {viewOptions}
   * @private
   */
  #defaultOptions = {
    subview: true
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options = {}, domain = undefined) {
    super();
    this.mergeOptions(
        this.#defaultOptions,
        options,
    );
    this.#domain = domain;
  }

  #domain = undefined

 /**
   * Create the cards to include in the view.
   *
   * @return {Object[] | Promise} An array of card objects.
   */
  async createViewCards() {
    let cards = [
      {
        type: "custom:auto-entities",
        card: {
          type: "grid",
          columns: 1,
          square: false,
          title: `${this.#domain.charAt(0).toUpperCase()}${this.#domain.slice(1)}s on`
        },
        card_param: "cards",
        filter: {
          include: [
            {
              domain: this.#domain,
              state: `${this.#domain=="cover" ? "open": "on"}`,
              options: {
                type: `custom:mushroom-${this.#domain}-card`,
                show_brightness_control: true,
                layout: "horizontal"
              }
            }
          ]
        }
      }
    ];
    return cards;
   
  }
}

export {DomainView};
