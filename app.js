let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
//
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let cookieEncrypter = require('cookie-encrypter');
let bodyParser = require('body-parser');

let authMiddleware = require('./middleware/auth');

let index        = require('./routes/index');
let auth         = require('./routes/auth');

let app = express();
let cfg = require('./app-config');
let db = require('./db/db');
let migrate = require('./db/migrate');

migrate(db);
app.disable('etag');
app.set('trust proxy', 1);
let helmet = require('helmet');
app.use(helmet());

// view engine setup
app.set('view engine' ,'mustache');
app.set('views', path.join(__dirname, 'views'));
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(cfg.cookieKey));
app.use(cookieEncrypter(cfg.cookieKey));
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', auth);
// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: err});
});
module.exports = app;
