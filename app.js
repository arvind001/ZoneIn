
require('./db');
require('./auth');
var passport = require('passport');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');
//var expressHbs = require('express-handlebars');

//var session = require('express-session');

//Auth and db
global.logger = require('tracer').colorConsole()
var config = require('./config');

var fileUtils = require('./utils/file.js')
var uploadS3 = require('./tasks/uploadS3.js')
uploadS3.init()

//fileUtils.upload('./public/images/arm.jpg')



//var product = require('./product');
//var preference = require('./routes/preference');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('views', __dirname + 'views');
app.set('view engine', 'hbs');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var sessionOptions = {
    secret: config.secretCookieCode, /* secret cookie thang (store this elsewhere!) */
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection : mongoose.connection }),
    cookie: { maxAge: 180 * 60 *1000 }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});



//app.use('/', preference);
require('./routes')(app)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);

module.exports = app;
