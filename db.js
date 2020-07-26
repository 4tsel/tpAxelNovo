const fs = require(`fs`);
const dataBase = JSON.parse(fs.readFileSync(`./data/concesionarias.json`, `utf-8`));

module.exports = dataBase;