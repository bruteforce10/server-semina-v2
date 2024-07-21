const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// router
const categoriesRouter = require("./app/api/v2/categories/router");
const imagesRouter = require("./app/api/v2/images/router");
const v2 = "/api/v2/cms";
const notFoundMiddleware = require("./app/middlewares/not-found.js");
const handleErrorMiddleware = require("./app/middlewares/handler-error.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(v2, categoriesRouter);
app.use(v2, imagesRouter);
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Server Semina V2",
  });
});

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

module.exports = app;
