  // import { createClient } from '@supabase/supabase-js'
  // import dotenv from 'dotenv';
  // dotenv.config();
  // const supabaseUrl = 'https://fdbqtdftqqslqatesqlu.supabase.co'
  // const supabaseKey = process.env.SUPABASE_KEY
  // console.log(supabaseKey);
  // export const supabase = createClient(supabaseUrl, supabaseKey)

  const dotenv = require('dotenv');
  dotenv.config();
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = 'https://fdbqtdftqqslqatesqlu.supabase.co/';
  const supabaseKey = process.env.SUPABASE_KEY; 
  const supabase = createClient(supabaseUrl, supabaseKey);
  module.exports = { supabase };

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts")

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get('/posts', async (req, res) => {

// });

module.exports = app;

// app._router.stack.forEach(function(r) {
//   if (r.route && r.route.path) {
//     console.log(r.route.path);
//   }
// });
