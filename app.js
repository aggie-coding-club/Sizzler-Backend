require("dotenv").config();

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
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");


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
app.use("/tags", tagsRouter);
app.use("/customers", customersRouter);
app.use("/restaurants", restaurantsRouter)

const port = process.env.BACKEND_PORT;
const BACKEND_URL = `http://${host}:${port}`;
app.listen(port, host, () => {
	console.info(`Sizzler backend listening on ${BACKEND_URL}`);
});

module.exports = {BACKEND_URL, app};
