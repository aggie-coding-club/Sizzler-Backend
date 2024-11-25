var supabase = require("../supabase");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  //res.send("respond with a resource");
  try {
		// Query the "posts" table
		// const { data, error } = await supabase
		//   .from('user_profiles')
		//   .select('*');
		let { data, error } = await supabase.from("user_profiles").select("*");
		// Handle errors
		if (error) {
			console.error("Error fetching users:", error);
			return res.status(500).send("Error fetching users");
		}
		// Query the "posts" table
		// const { data, error } = await supabase
		//   .from('user_profiles')
		//   .select('*');


		// Console log all posts
		console.info("Users:", data);
		// Console log all posts
		console.info("Users:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

router.post("/create/", async function (req, res, next) {
  try {
    // create
    const {accountType, email, firstName, lastName, username, resName, street, city, state, ID} = req.body;
    // USE SUPABASE SIGN UP API TO CREATE AN AUTH.USER THEN CREATE A USER PROFILE
    console.log(accountType);
    const { data, error } = await supabase
      .from('user_profiles') 
      .insert([{id: ID, 
              user_type: accountType,
              email: email}])
      .select();
    /*
    const restaurant = {
      userID: d[0].id,
      restaurantName: resName,
      streetAddress: street,
      City: city,
      State: state
    }; */
    if (accountType === "customer"){
      // IN THE FUTURE CHANGE THIS TO CALL CUSTOMERS ENDPOINT
      const {d, e} = await supabase
      .from("customers")
      .insert({id : ID,
        first_name: firstName,
        last_name: lastName,
        username: username
      })
      .select();
      
    } else {
      // IN THE FUTURE CHANGE THIS TO CALL RESTAURANTS ENDPOINT
      
      const {d1, e1} = await supabase
        .from("restaurants")
        .insert([{id: ID,
          restaurant_name: resName,
          street_address: street,
          city: city,
          state: state,
        }])
        .select(); 

    }
    console.log("Success")
    if (error) {
      console.error('Error creating users:', error);
      return res.status(500).send('Error creating users');
    }

    res.json(data);
  } catch (err){
    console.error('Error in creating users:', err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
