import {Helper} from "Helper";
import {AbstractView} from "views/AbstractView";
import {TitleCard} from "cards/TitleCard";

/**
 * Area View Class.
 *
 * Used to create a Area view.
 *
 * @class AreaView
 * @extends AbstractView
 */
class AreaView extends AbstractView {
  /**
   * Default options for the view.
   * 
   * @type {viewOptions}
   * @private
   */
  #defaultOptions = {
    subview: true,
  };

  #area = {}

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options = {}, area) {
    super();
    this.mergeOptions(
        this.#defaultOptions,
        options,
    );
    this.#area = area;
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Promise} A promise of a card object array.
   * @override
   */
  async createViewCards() {
    const exposedDomainIds = Helper.getExposedDomainIds();
    const area             = this.#area;
    const viewCards        = [...(area.extra_cards ?? [])];

    // Create cards for each domain.
    for (const domain of exposedDomainIds) {
      if (domain === "default") {
        continue;
      }

      const className = Helper.sanitizeClassName(domain + "Card");

      let domainCards = [];

      try {
        domainCards = await import(`cards/${className}`).then(cardModule => {
          let domainCards = [];
          const entities  = Helper.getDeviceEntities(area, domain);
          if (entities.length) {
            // Create a Title card for the current domain.
            const titleCard = new TitleCard(
                [area],
                Helper.strategyOptions.domains[domain],
            ).createCard();

            if (domain === "sensor") {
              // Create a card for each entity-sensor of the current area.
              const sensorStates = Helper.getStateEntities(area, "sensor");
              const sensorCards  = [];

              for (const sensor of entities) {
                // Find the state of the current sensor.
                const sensorState = sensorStates.find(state => state.entity_id === sensor.entity_id);
                let cardOptions   = Helper.strategyOptions.card_options?.[sensor.entity_id] ?? {};

                if (!cardOptions.hidden) {
                  if (sensorState?.attributes.unit_of_measurement) {
                    cardOptions = {
                      ...{
                        type: "custom:mini-graph-card",
                        entities: [sensor.entity_id],
                      },
                      ...cardOptions,
                    };
                  }

                  sensorCards.push(new SensorCard(sensor, cardOptions).getCard());
                }
              }

              if (sensorCards.length) {
                domainCards.push({
                  type: "vertical-stack",
                  cards: sensorCards,
                });

                domainCards.unshift(titleCard);
              }

              return domainCards;
            }

            // Create a card for each domain-entity of the current area.
            for (const entity of entities) {
              let cardOptions = Helper.strategyOptions.card_options?.[entity.entity_id] ?? {};

              if (!cardOptions.hidden) {
                domainCards.push(new cardModule[className](entity, cardOptions).getCard());
              }
            }

            if (domain === "binary_sensor") {
              // Horizontally group every two binary sensor cards.
              const horizontalCards = [];

              for (let i = 0; i < domainCards.length; i += 2) {
                horizontalCards.push({
                  type: "horizontal-stack",
                  cards: domainCards.slice(i, i + 2),
                });
              }

              domainCards = horizontalCards;
            }

            if (domainCards.length) {
              domainCards.unshift(titleCard);
            }
          }

          return domainCards;
        });
      } catch (e) {
        console.error(e);
      }

      if (domainCards.length) {
        viewCards.push({
          type: "vertical-stack",
          cards: domainCards,
        });
      }
    }

    if (!Helper.strategyOptions.domains.default.hidden) {
      // TODO: Check if default is hidden
      // Create cards for any other domain.
      // Collect device entities of the current area.
      const areaDevices = Helper.devices.filter(device => device.area_id === area.area_id)
          .map(device => device.id);
  
      // Collect the remaining entities of which all conditions below are met:
      // 1. The entity is linked to a device which is linked to the current area,
      //    or the entity itself is linked to the current area.
      // 2. The entity is not hidden and is not disabled.
      const miscellaneousEntities = Helper.entities.filter(entity => {
        return (areaDevices.includes(entity.device_id) || entity.area_id === area.area_id)
            && entity.hidden_by == null
            && entity.disabled_by == null
            && !exposedDomainIds.includes(entity.entity_id.split(".", 1)[0]);
      });
  
      // Create a column of miscellaneous entity cards.
      if (miscellaneousEntities.length) {
        let miscellaneousCards = [];
  
        try {
          miscellaneousCards = await import("cards/MiscellaneousCard").then(cardModule => {
            /** @type Object[] */
            const miscellaneousCards = [
              new TitleCard([area], Helper.strategyOptions.domains.default).createCard(),
            ];
  
            for (const entity of miscellaneousEntities) {
              let cardOptions = Helper.strategyOptions.card_options?.[entity.entity_id] ?? {};
  
              if (!cardOptions.hidden) {
                miscellaneousCards.push(new cardModule.MiscellaneousCard(entity, cardOptions).getCard());
              }
            }
  
            return miscellaneousCards;
          });
        } catch (e) {
          console.error(Helper.debug ? e : "An error occurred while creating the domain cards!");
        }
  
        viewCards.push({
          type: "vertical-stack",
          cards: miscellaneousCards,
        });
      }
    }

    // Return cards.
    return viewCards;
  }
}

export {AreaView};
