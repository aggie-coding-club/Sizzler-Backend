var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// Create

// Read all
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

// Read by User ID
router.get("/read/user/:user_id", async function (req, res, next) {
    try {
      const user_id = req.params.user_id;

      // Query the "posts" table
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', user_id);

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

// Read by Post ID
router.get("/read/post/:post_id", async function (req, res, next) {
    try {
      const post_id = req.params.post_id;

      // Query the "posts" table
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', post_id);

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