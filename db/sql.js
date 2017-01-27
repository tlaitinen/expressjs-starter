let pgp = require('pg-promise');
let cfg = require('../app-config');
let path = require('path');
module.exports = dir => file => {
  if (cfg.debug) {
    console.log('sql', dir, file);
  }
  return new pgp.QueryFile(path.join(__dirname, 'sql', dir, file +'.sql'), {
    minify: true,
    debug: cfg.debug
  });
};
