require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");


const app = express();

const host = process.env.TAMU_WIFI_HOST;
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
//app.use(express.static(path.join(__dirname, "public")));
//test


//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs'); // or 'ejs' if using EJS

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

const port = process.env.BACKEND_PORT;
const BACKEND_URL = `http://${host}:${port}`;
app.listen(port, host, () => {
	console.info(`Sizzler backend listening on ${BACKEND_URL}`);
});

module.exports = app;
