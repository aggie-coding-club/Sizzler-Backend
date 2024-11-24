var express = require("express");
var router = express.Router();
var supabase = require("../supabase");  

//const function


router.post("/", async function (req, res, next) {
    const { accountType, email, username, password, firstName, lastName, resName, state, city, street } = req.body;
    

    try {
  
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
          })
        
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      // // If successful, generate a JWT token for user authorization
      // const token = jwt.sign(
      //   { id: data.user.id, email: data.user.email },
      //   JWT_SECRET,
      //   { expiresIn: '1h' } // Token expires in 1 hour
      // );
  
      // // Send token and success message back to the client
      res.status(200).json({
        success: true,
        message: "Sign Up successful!",
        //token: token, // Include JWT token
        user: data.user,
      });
      //res.status(200).json({ message: 'Login successful! Check your email for verification.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during sign up' });
    }
  });


module.exports = router;