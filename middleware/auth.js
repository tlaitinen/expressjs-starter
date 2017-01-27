let user = require('../db/user');
let sessionCookie = require('../routes/session-cookie');
let cfg = require('../app-config');
module.exports = (req,res,next) => {
  let c = req.signedCookies['_SESSION'];
  req.authId = null;
  let clearSession = () => { 
    res.clearCookie('_SESSION', cfg.cookieParams);
    req.authId = null;
  };
  if (typeof c === 'string') {
    try {
      let session = sessionCookie.parse(c);
      req.authId = session.userId;
      user.getById(req.authId, req.authId)
        .then(u => {
          if (u.active === true) {
            req.auth = u;
          } else {
            clearSession();
          }
          next();
        })
        .catch(e => {
          console.log(e);
          clearSession();
          next();
        });
    } catch (e) {
      console.log(e);
      clearSession();
      next();
    } 
  } else {
    next();
  }
};
