import { settings } from '../src/settings.js';
import YAML from 'yaml';
import fs from 'fs';

fs.writeFileSync('./dist/sensors.yaml', YAML.stringify([{"sensor":settings.sensors}], null, 2));
console.log('done');