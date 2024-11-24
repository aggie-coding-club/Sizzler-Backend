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
    console.log(accountType);
    const { data, error } = await supabase
      .from('user_profiles') 
      .insert([{id: ID, 
              user_type: accountType,
              email: email}])
      .select();
    const restaurant = {
      userID: ID,
      restaurantName: resName,
      streetAddress: street,
      City: city,
      State: state
    };
    const customer = {
      id: ID,
      FName: firstName,
      LName: lastName,
      username: username
    };
    const { backend_url } = require('./app');

    if (accountType === "customer"){
      fetch(`${backend_url}/customers/create`, {
        method: "POST", // HTTP method
        headers: {
            "Content-Type": "application/json" // Inform the backend of the data format
        },
        body: JSON.stringify(customer) // Convert JavaScript object to JSON
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
      
    } else {
      // IN THE FUTURE CHANGE THIS TO CALL RESTAURANTS ENDPOINT
      fetch(`${backend_url}/restaurants/create`, {
        method: "POST", // HTTP method
        headers: {
            "Content-Type": "application/json" // Inform the backend of the data format
        },
        body: JSON.stringify(restaurant) // Convert JavaScript object to JSON
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


    }
    console.log("Success")
    if (error) {
      console.error('Error creating users:', error);
      return res.status(500).send('Error creating users');
    }

		// Console log all posts
		console.info("Users:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});



module.exports = router;
