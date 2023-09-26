import {Helper} from "Helper";

/**
 * Abstract View Class.
 *
 * To create a new view, extend the new class with this one.
 *
 * @class
 * @abstract
 */
class AbstractView {
  /**
   * Options for creating a view.
   *
   * @type {abstractOptions}
   */
  options = {
    title: null,
    path: null,
    icon: "mdi:view-dashboard",
    subview: false,
  };

  /**
   * Class constructor.
   *
   * @throws {Error} If trying to instantiate this class.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor() {
    if (this.constructor === AbstractView) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }
  }

  /**
   * Merge the default options of this class and the custom options into the options of the parent class.
   *
   * @param {Object} [defaultOptions={}] Default options for the card.
   * @param {Object} [customOptions={}] Custom Options for the card.
   */
  mergeOptions(defaultOptions, customOptions) {
    this.options = {
      ...defaultOptions,
      ...customOptions,
    };
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Object[] | Promise} An array of card objects.
   */
  async createViewCards() {
    return [];
  }

  /**
   * Get a view object.
   *
   * The view includes the cards which are created by method createViewCards().
   *
   * @returns {viewOptions & {cards: Object[]}} The view object.
   */
  async getView() {
    return {
      ...this.options,
      cards: await this.createViewCards(),
    };
  }
}

export {AbstractView};
