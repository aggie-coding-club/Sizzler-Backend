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

const app = express();

const allowedOrigins = [
	process.env.LOCALHOST_URL,
	process.env.SUPABASE_URL,
	process.env.REACT_NATIVE_URL,
];

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

const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

module.exports = app;
