require("dotenv").config();

const express = require("express");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors"); // Import the cors package

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var tagsRouter = require("./routes/tags");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");
var customersRouter = require("./routes/customers");
var restaurantsRouter = require("./routes/restaurants");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

const host = process.env.WIFI_HOST || process.env.LOCAL_HOST;
const EXPO_URL = `exp://${host}:${process.env.EXPO_PORT}`;

const allowedOrigins = [process.env.EXPO_LOCALHOST_URL, EXPO_URL];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Request made from unauthorized URL"));
			}
		},
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/tags", tagsRouter);
app.use("/customers", customersRouter);
app.use("/restaurants", restaurantsRouter)

const port = process.env.BACKEND_PORT;
const BACKEND_URL = `http://${host}:${port}`;
app.listen(port, host, () => {
	console.info(`Sizzler backend listening on ${BACKEND_URL}`);
});

module.exports = app;
