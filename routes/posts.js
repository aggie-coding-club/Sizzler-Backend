var express = require("express");
var router = express.Router();
var supabase = require("../supabase");



// read 
router.get("/read/", async function (req, res, next) {
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

// create
router.post("/create/", async function (req, res, next) {
  try {
    // create
    const {userID, title, caption, media} = req.body;

    const { data, error } = await supabase
      .from('posts') 
      .insert([{user_id : userID,
      title : title,
      caption : caption,
      media_links: media}])
      .select()
    
    console.log("Success")
    if (error) {
      console.error('Error creating posts:', error);
      return res.status(500).send('Error creating posts');
    }

    res.json(data);
  } catch (err){
    console.error('Error in creating posts:', err);
    res.status(500).send('Server error');
  }
});


// update
router.put("/update/", async function (req, res, next){
  try {
    const { title, caption, media, postID } = req.body; 
    const { data, error } = await supabase
      .from('posts')
      .update({'title': title, 'caption': caption, 'media_links':media})
      .eq('id', postID)
      .select()
    
    res.json(data);
    if (error){
      console.error('Error updating posts:', error);
      return res.status(500).send('Error updating posts')
    }
  } catch (err){
      console.error('Error in creating posts:', err);
      res.status(500).send('Server error')
  }
})
// delete
router.delete("/delete/", async function (req, res, next){
  try {
    const {postID} = req.body;
    const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postID)

    if (error){
      console.error('Error deleting posts:', error);
      return res.status(500).send('Error deleting posts');
    }

    res.json(data);
  } catch (err){
    console.error('Error in deleting posts:', err);
    res.status(500).send('Server error')
  }
})
module.exports = router;
