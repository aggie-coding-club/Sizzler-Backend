var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// Read
router.get("/read/", async function (req, res, next) {
    try {
      // Query the "posts" table
      const { data, error } = await supabase
        .from('customers')
        .select('*'); 
      if (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).send('Error fetching customers');
      }
  
      // Console log all posts
      console.log('Customers:', data);

      // Send the posts as a response
      res.json(data);
    } catch (err) {
      console.error('Error in fetching customers:', err);
      res.status(500).send('Server error');
    }
});

module.exports = router;