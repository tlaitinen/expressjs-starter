let pgp = require('pg-promise');
let cfg = require('../app-config');
let path = require('path');
module.exports = pgp.utils.enumSql(path.join(__dirname, 'sql'), {recursive:true}, path => {
  return new pgp.QueryFile(path, {
    minify: true,
    debug: cfg.debug
  });
});
