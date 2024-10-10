//import { supabase } from "../app";
var supabase = require("../app");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  
  const {response,error} = await supabase.from("posts").select("*");
  console.log(response);
  req.res.render("index", { title: response });
});

module.exports = router;
