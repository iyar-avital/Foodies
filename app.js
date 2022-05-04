const configoration = require('./config.json');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo');

var indexRouter = require('./routes/home_routes');
var navigationRouter = require('./routes/navigation_routes');
var usersRouter = require('./routes/users_routes');
var flowersRouter = require('./routes/flowers_routes');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let secret = 'flowers project secret';
let sessConnStr = "mongodb://127.0.0.1/sessions";

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name: 'user cookie',       // the name of session ID cookie
  secret: secret,            // the secret for signing the session ID cookie - mandatory option
  resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
  saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
  rolling: true,             // do we send the session ID cookie with each response?
  store: MongoStore.create({ mongoUrl: sessConnStr }), // session storage backend
  cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters (15 min)
}));

app.use('/', indexRouter);
app.use('/navigation', navigationRouter);

app.all('/*', async (req, res, next) => {
  console.log(req.session);
  if (req.session.username)
    next();
  else
    res.send('<h1>You are not logged in</h1>');
});

app.use('/users', usersRouter);
app.use('/flowers', flowersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
