const configoration = require("./config.json");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("serve-favicon");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local").Strategy;

var auth = require("./utils/authentication");
var loginRouter = require("./routes/login_routes");
var indexRouter = require("./routes/home_routes");
var navigationRouter = require("./routes/navigation_routes");
var usersRouter = require("./routes/users_routes");
var flowersRouter = require("./routes/flowers_routes");
var app = express();

(async () => {
  process.on("SIGINT", async () => {
    process.exit(0);
  });

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger("dev"));
  app.use(cookieParser(configoration.secret));
  app.use(express.static(path.join(__dirname, "public")));

  app.use(
    session({
      name: "user cookie",
      secret: configoration.secret,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      store: MongoStore.create({ mongoUrl: configoration.connection_str }),
      cookie: { maxAge: 900000, httpOnly: true, sameSite: true },
    })
  );

  // handle authentication
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(auth.authUser));
  passport.serializeUser(auth.serializeUser);
  passport.deserializeUser(auth.deserializeUser);

  app.use("/", loginRouter, indexRouter);
  app.use("/navigation", navigationRouter);
  app.use("/users", auth.checkStaffAuthenticated, usersRouter);
  app.use("/flowers", auth.checkAuthenticated, flowersRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
})();

module.exports = app;
