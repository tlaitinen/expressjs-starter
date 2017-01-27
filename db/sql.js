let pgp = require('pg-promise');
let cfg = require('../app-config');
let path = require('path');

let queryFiles = {};

module.exports = dir => file => {
  if (cfg.debug) {
    console.log('sql', dir, file);
  }
  let p = path.join(__dirname, 'sql', dir, file + '.sql');
  if (!(p in queryFiles)) {
    queryFiles[p] = new pgp.QueryFile(p, {
      minify: true,
      debug: cfg.debug
    });
  }
  return queryFiles[p];
};
