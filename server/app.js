require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const configurePassport = require("./config/passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const fixturesRouter = require("./routes/api/fixtures");
const teamsRouter = require("./routes/api/teams");

// connect to MongoDB
require("./config/mongoose");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// Passport middleware
app.use(passport.initialize());
// Passport config
configurePassport(passport);

// Routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/fixtures", fixturesRouter);
app.use("/api/teams", teamsRouter);

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
  res.json({ error: err });
});

module.exports = app;
