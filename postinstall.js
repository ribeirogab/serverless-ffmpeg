const fs = require('fs');

const packageJson = require('./package.json');

const NODEJS_DEPENDENCIES_DIR = './layers/dependencies/nodejs';

let dependencies = {};

if (packageJson.dependencies) {
  dependencies = packageJson.dependencies;
}

if (!fs.existsSync(NODEJS_DEPENDENCIES_DIR)) {
  fs.mkdirSync(NODEJS_DEPENDENCIES_DIR, { recursive: true });
}

fs.writeFileSync(
  `${NODEJS_DEPENDENCIES_DIR}/package.json`,
  JSON.stringify({ dependencies }, null, 2),
);
