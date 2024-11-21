var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// Read
router.get("/tag", async function (req, res, next) {
    try {
        // Query the "posts" table
        
    let { data: tags, error } = await supabase
        .from('tags')
        .select('*')

        
        // let { data: posts, error } = await supabase
        //   .from('posts')
        //   .select('id');
        // Handle errors
        if (error) {
          console.error('Error fetching tags:', error);
          return res.status(500).send('Error fetching tags');
        }
    
        // Console log all posts
        console.log('tags:', data);
  
        // Send the posts as a response
        res.json(data);
      } catch (err) {
        console.error('Error in fetching tags:', err);
        res.status(500).send('Server error');
      }
    
});


router.get("/tag/id", async function (req, res, next) {
    try {
      const post_id = req.params.post_id;

      // Query the "posts" table
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('id', post_id);
      
      // let { data: posts, error } = await supabase
      //   .from('posts')
      //   .select('id');
      // Handle errors
      if (error) {
        console.error('Error fetching tag2:', error);
        return res.status(500).send('Error fetching tag2');
      }
  
      // Console log all posts
      console.log('Tags:', data);

      // Send the posts as a response
      res.json(data);
    } catch (err) {
      console.error('Error in fetching tag2:', err);
      res.status(500).send('Server error');
    }
});

module.exports = router;