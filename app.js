/** Express app for Lunchly. */

const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Parse body for urlencoded (non-JSON) data
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Nunjucks templating engine
nunjucks.configure("templates", {
	autoescape: true,
	express: app,
});

// Use routes defined in routes.js
app.use("/", routes);

/** 404 handler */
app.use(function (req, res, next) {
	const err = new Error("Not Found");
	err.status = 404;

	// pass the error to the next piece of middleware
	return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.render("error.html", { err });
});

module.exports = app;
