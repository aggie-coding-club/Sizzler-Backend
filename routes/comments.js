var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// Create

// Read
router.get("/read/", async function (req, res, next) {
    try {
      // Query the "posts" table
      const { data, error } = await supabase
        .from('comments')
        .select('*');

      if (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).send('Error fetching comments');
      }
  
      // Console log all posts
      console.log('Comments:', data);

      // Send the posts as a response
      res.json(data);
    } catch (err) {
      console.error('Error in fetching comments:', err);
      res.status(500).send('Server error');
    }
});

// Update

// Delete


module.exports = router;