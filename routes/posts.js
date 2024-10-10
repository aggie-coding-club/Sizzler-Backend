var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

router.get("/", async function (req, res, next) {
  console.log("hi_andrew");
    try {
      // Query the "posts" table
      const { data, error } = await supabase
        .from('posts')
        .select('*');
      
      // let { data: posts, error } = await supabase
      //   .from('posts')
      //   .select('id');
      // Handle errors
      if (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).send('Error fetching posts');
      }
  
      // Console log all posts
      console.log('Posts:', data);
  
      // Send the posts as a response
      res.json(data);
    } catch (err) {
      console.error('Error in fetching posts:', err);
      res.status(500).send('Server error');
    }
  

});
  
module.exports = router;
