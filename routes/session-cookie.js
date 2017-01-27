let cfg = require('../app-config');
let moment = require('moment');
module.exports = {
  create: (userId) => {
    let m = moment();
    m.add(cfg.cookieParams.maxAge, 'milliseconds');
    return JSON.stringify({
      userId,
      validUntil: m.toJSON()
    });
  },
  parse: (s) => {
    let c = JSON.parse(s);
    let validUntil = moment(c.validUntil);    
    let now = moment();
    if (now.unix() >= validUntil.unix()) {
      throw 'Session expired';
    } else {
      return c;
    }
  }
};
