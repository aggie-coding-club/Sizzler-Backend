var express = require("express");
var router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://fdbqtdftqqslqatesqlu.supabase.co/";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*");
  console.log("Posts: ", data);

  res.json(data);
})

module.exports = router;
