var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts")
var loginRouter = require("./routes/login")

var app = express();
var cors = require('cors');

// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors({
  origin: '*', // Allow all origins; you may specify specific origins for security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.use(cors(corsOptions));


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
app.use("/login", loginRouter);

const port = 3000;
app.listen(port, '10.244.212.164',  () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

