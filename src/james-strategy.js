class JamesStrategy {

  static async generateDashboard(info) {

    return {
      title: "James Dashboard",
      views: [
        {
          "cards": [
            {
              "type": "markdown",
              "content": `Generated at ${(new Date).toLocaleString()}`
            }
          ]
        }
      ]
    };

  }

}

customElements.define("ll-strategy-james-strategy", JamesStrategy);