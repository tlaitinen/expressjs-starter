let express = require('express');
let router = express.Router();
let user = require('../db/user');
let sessionCookie = require('./session-cookie');
let cfg = require('../app-config');
router.post('/login', function(req, res, next) {
  user.login(req.body.username, req.body.password)
  .then(userId => {
    if (userId !== null) {
      res.cookie('_SESSION', sessionCookie.create(userId), cfg.cookieParams);
      res.json({});
    } else {
      res.status(401).end('Invalid username or password');
    }
  }, next);
});
router.post('/logout', function(_req, res) {
  res.clearCookie('_SESSION', cfg.cookieParams).end('');
});
module.exports = router;
