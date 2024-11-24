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

var app = express();

app.use(cors());

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

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

