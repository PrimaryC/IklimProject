var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var nonogram = require('./routes/nonogram');
var nurie = require('./routes/nurie');
var auth = require('./routes/auth');

var app = express();
const util = require('util');

var session = require('express-session');
var mongodb = require('./internal_module/db.js');
var passport = require('./internal_module/passport.js');
var _passport = require('passport');

var Redis = require('ioredis');
var RedisStore = require('connect-redis')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var store = new RedisStore({host:'127.0.0.1', db:1})

app.use(session({
  secret : "#!@$%^#",
  store : store,
  resave : false,
  saveUninitialized : false,
  cookie : { maxAge : 60000 }
}));

app.use(_passport.initialize());
app.use(_passport.session());

mongodb.init();
passport.setup();

app.use('/auth', auth);
app.use('/nonogram', nonogram);
app.use('/nurie',nurie);

app.get('/', function(req, res, next) {
  var u = false;
  console.log(typeof req.session.passport);
  if(typeof req.session.passport != "undefined"){
    u = req.session.passport.user
  }
  res.render('index', { title: 'Express', user:u });
  console.log(util.inspect(req.session));
});

app.get('/blankspace', function(req, res, next){
  res.render('blank');
});

app.get('/what', function(req, res, next){
  let db1 =          new Redis(6379, 'localhost');
  db1.lrange("whatthefuckisthisshit", 0, -1).then(values => {console.log(values)}, reason => {
    console.log(reason);
    console.log("this was error.");
  });
  res.send("what");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
