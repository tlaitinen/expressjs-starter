let cfg = require('../app-config');
let pgp = require('pg-promise')();
module.exports = pgp(cfg.database);
