const YAML = require('yaml')
const fs = require('fs');

import("./settings.mjs").then((module) => {
	fs.writeFileSync('./dist/sensors.yaml', YAML.stringify([{"sensor":module.settings.sensors}], null, 2));
	console.log('done');
});
