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

module.exports = router;
