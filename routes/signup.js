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

      const { backend_url } = require('./app');

      const info = {
        accountType: accountType,
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        resName: resName,
        state: state,
        street: street,
        city: city,
        ID: data.user.id
      };
      fetch(`${backend_url}/users/create`, {
        method: "POST", // HTTP method
        headers: {
            "Content-Type": "application/json" // Inform the backend of the data format
        },
        body: JSON.stringify(info) // Convert JavaScript object to JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP Error");
            }
            return response.json(); // Parse JSON response
        })
        .then(result => {
            console.log("Success:", result); // Handle the response data
        })
        .catch(error => {
            console.error("Error:", error); // Handle errors
        });

      // // Send token and success message back to the client
      res.status(200).json({
        success: true,
        message: "Sign Up successful!",
        user: data.user
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during sign up' });
    }
  });


module.exports = router;