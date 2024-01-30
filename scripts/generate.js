const YAML = require('yaml')
const fs = require('fs');

const settings = loadSettings();

let sensors = [];
for (let sensor of settings.sensors) {
	sensors = sensors.concat(perLevel(sensor));
}
fs.writeFileSync('./dist/sensors.yaml', YAML.stringify([{"sensor":sensors}], null, 2));
console.log('done');

function loadSettings() {
	let data = fs.readFileSync('./src/settings.js', 'utf8').replace('export const settings = ', '');
	let result = JSON.parse(data);
	return result;
}

function perLevel(template) {
	let result = [];
	result.push(template);
	for (let level of settings.levels) {
		let sensor = JSON.parse(JSON.stringify(template));
		let areaEntities = level.areas.map(a=> `area_entities('${a}')`).join(', ');
		sensor.state = sensor.state.replace(`states.${sensor.domain}`, `expand(${areaEntities}) | select('match', '${sensor.domain}')`)
		sensor.name = sensor.name.replace('James ', `James ${level.name[0].toUpperCase()}${level.name.substring(1)} `);
		delete sensor.domain;
		result.push(sensor);
	}
	return result;
}