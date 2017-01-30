let db = require('./db');
let sql = require('./sql').migrations;
let _ = require('lodash');
const myVersion = 0;
let jed = require('jed');

module.exports = function() {
  return db.tx(t => {
    t.none(sql.always);
    return t.one(sql.getVersion)
      .then(row => {
        return t.batch(_.range(myVersion, row.version)
            .map(v => t.none(sql[jed.sprintf('%03d', v)])))
          .then(() => {
            t.none(sql.updateVersion, {version:myVersion});
          });
      });
  });
};
