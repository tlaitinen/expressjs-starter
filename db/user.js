let db       = require('./db');
let sql      = require('./sql').user;
let password = require('./password');
let helpers  = require('./helpers');
module.exports = {
  getById: (authId, userId) => {
    return helpers.json(db.one(sql.getById, {id: userId, authId}));
  },
  login: (userName, pwd) => {
    return db.one(sql.getPassword, {userName})
      .then(u => {
        if (password.verify(u.password, pwd) === true) {
          return u.id;
        } else {
          return null;
        }
      });
  }
};
