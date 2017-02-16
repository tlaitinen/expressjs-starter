let sql = require('./sql').migrations;
let _ = require('lodash');
let jed = require('jed');

let scriptName = v => jed.sprintf('m%03d', v);

module.exports = function(t) {

  let myVersion = 0;
  for (;scriptName(myVersion+1) in sql; myVersion++);

  return t.tx(t => {
    t.none(sql.always);
    return t.one(sql.getVersion)
      .then(row => {
        let versions = _.range(row.version + 1, myVersion + 1);
        function versionQuery(idx) {
          if (idx >= versions.length)
            return;
          let v = versions[idx];
          console.log('migrating to version', v);
          return this.none(sql[scriptName(v)]);
        }
        return t.sequence(versionQuery)
          .then(() => {
            t.none(sql.updateVersion, {version:myVersion});
          });
      });
  });
};
