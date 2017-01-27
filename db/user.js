let db       = require('./db');
let sql      = require('./sql')('user');
let password = require('./password');
let helpers  = require('./helpers');
module.exports = {
  getById: (authId, userId) => {
    return helpers.json(db.one(sql('get-by-id'), {id: userId, authId}));
  },
  login: (userName, pwd) => {
    return db.one(sql('get-password'), {userName})
      .then(u => {
        if (password.verify(u.password, pwd) === true) {
          return u.id;
        } else {
          return null;
        }
      });
  }
};
