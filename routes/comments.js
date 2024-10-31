var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// Create
router.post("/create/", async function (req, res, next) {
  try {
    // create
    const {userID, postID, title, caption} = req.body;

    const { data, error } = await supabase
      .from('comments') 
      .insert([
        { 
          user_id : userID,
          post_id : postID,
          title : title,
          caption : caption,
        }
      ])
      .select()
    
    console.log("Success")
    if (error) {
      console.error('Error creating comments:', error);
      return res.status(500).send('Error creating comments');
    }

    res.json(data);
  } catch (err){
    console.error('Error in creating comments:', err);
    res.status(500).send('Server error');
  }
});

// Read all
router.get("/read/", async function (req, res, next) {
    try {
      // Query the "comments" table
      const { data, error } = await supabase
        .from('comments')
        .select('*');

      if (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).send('Error fetching comments');
      }
  
      // Console log all comments
      console.log('Comments:', data);

      // Send the comments as a response
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

      // Query the "comments" table
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', user_id);

      if (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).send('Error fetching comments');
      }
  
      // Console log all comments
      console.log('Comments:', data);

      // Send the comments as a response
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

      // Query the "comments" table
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', post_id);

      if (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).send('Error fetching comments');
      }
  
      // Console log all comments
      console.log('Comments:', data);

      // Send the comments as a response
      res.json(data);
    } catch (err) {
      console.error('Error in fetching comments:', err);
      res.status(500).send('Server error');
    }
});

// Update
router.put("/update/", async function (req, res, next){
  try {
    const { title, caption, postID, userID, commentID } = req.body; 
    const { data, error } = await supabase
      .from('comments')
      .update(
        {
          'user_id': userID, 
          'post_id': postID,
          'title': title, 
          'caption': caption 
        }
      )
      .eq('id', commentID)
      .select()
    
    res.json(data);
    if (error){
      console.error('Error updating comments:', error);
      return res.status(500).send('Error updating comments')
    }
  } catch (err){
      console.error('Error in creating comments:', err);
      res.status(500).send('Server error')
  }
})

// Delete


module.exports = router;