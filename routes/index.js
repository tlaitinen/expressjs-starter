let express = require('express');
let router  = express.Router();
let user    = require('../db/user');
let authRoute = require('./auth-route');
router.get('/', authRoute((req, res, next) => {
  user.getById(req.authId,req.authId)
    .then(u => {
      res.json({user:u});
    }, next);
}));
module.exports = router;
