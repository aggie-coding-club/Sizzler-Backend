const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const tagsRouter = require("./routes/tags");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const customersRouter = require("./routes/customers");
const restaurantsRouter = require("./routes/restaurants");

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
app.use("/tags", tagsRouter);
app.use("/customers", customersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

const port = 3000;
export const BACKEND_URL = `http://${host}:${port}`;
app.listen(port, () => {
  console.log(`Sizzler app listening on port ${BACKEND_URL}`);
});

module.exports = app;
