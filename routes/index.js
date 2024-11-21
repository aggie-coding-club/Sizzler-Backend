var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

/* GET home page. */
router.get("/", function (req, res, next) {
  //req.res.render("index", { title: "Express" });
  //req.res.render("inputTest");
  res.render("inputTest");

});

router.post("/", async function (req, res, next) {
  const { email, passWord } = req.body;


  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: passWord
    })
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({
      success: true,
      message: 'Signup successful! Check your email for verification.',
      //token: token, // Include JWT token
      user: data.user,
    });
    //res.status(200).json({  });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during signup' });
  }
  // console.log('Name:', name);
  // console.log('Email:', email);
  // res.send(`Hello ${name}! ${email}`); 
  // const { data, error } = await supabase
  //   .from('user_profiles')
  //   .insert([{ user_type: user_type, email: email }])
  //   .select();
});

module.exports = router;
