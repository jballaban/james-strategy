import {Helper} from "Helper";

class JamesStrategy {

  static async generateDashboard(info) {
    await Helper.initialize(info);
    
    // Create views.
    const views = [];

    let viewModule;

    for (let viewId of Helper.getExposedViewIds()) {
      try {
        const viewType = Helper.sanitizeClassName(viewId + "View");
        viewModule     = await import(`views/${viewType}`);
        const view     = await new viewModule[viewType](Helper.strategyOptions.views[viewId]).getView();

        views.push(view);

      } catch (e) {
        console.error(Helper.debug ? e : `View '${viewId}' couldn't be loaded!`);
      }
    }

    let areaViewModule     = await import(`views/AreaView`);

    // Create subviews for each area.
    for (let area of Helper.areas) {
      if (!area.hidden) {
        views.push(
          await new areaViewModule["AreaView"]({
            path: area.area_id ?? area.name,
            area:area
          }).getView()
        );
      }
    }

    return {
      views: views,
    };
  }

}

customElements.define("ll-strategy-james-strategy", JamesStrategy);