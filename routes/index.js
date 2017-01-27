let express = require('express');
let router  = express.Router();
let user    = require('../db/user');
let authRoute = require('./auth-route');
router.get('/', authRoute((req, res, _next) => {
  user.getById(req.authId,req.authId)
    .then(u => {
      res.json({user:u});
    });
}));
module.exports = router;
