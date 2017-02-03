let db = require('./db');
let sql = require('./sql').migrations;
let _ = require('lodash');
let jed = require('jed');

let scriptName = v => jed.sprintf('m%03d', v);

module.exports = function() {

  let myVersion = 0;
  for (;scriptName(myVersion+1) in sql; myVersion++);

  return db.tx(t => {
    t.none(sql.always);
    return t.one(sql.getVersion)
      .then(row => {
        return t.batch(_.range(myVersion, row.version)
          .map(v => t.none(sql[scriptName(v)])))
          .then(() => {
            t.none(sql.updateVersion, {version:myVersion});
          });
      });
  });
};
