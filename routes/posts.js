var express = require("express");
var router = express.Router();
var supabase = require("../supabase");
// get timestamp
function getFormattedTimestamp() {
  /*
  const date = new Date();
  const pad = (num, size) => ('000' + num).slice(size * -1);
  const isoString = date.toISOString();
  const formattedDate = isoString.replace('T', ' ').replace('Z', '+00');
  const milliseconds = pad(date.getMilliseconds(), 3);
  const microseconds = pad(Math.floor(Math.random() * 1000), 3); // JavaScript doesn't support microseconds natively

  return `${formattedDate.slice(0, -1)}.${milliseconds}${microseconds}+00`; */
  // Get the current timestamp
  const now = new Date();

  // Convert to ISO string and adjust for the local timezone offset
  const postgresTimestamp = new Date(now.getTime() + (1000 * 60 * (-now.getTimezoneOffset()))).toISOString();
  return postgresTimestamp;
}






// read 
router.get("/read", async function (req, res, next) {
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
router.get("/create/:userID/:title/:caption/", async function (req, res, next) {
  try {
    // create
    let title_with_spaces = req.params["title"].replace(/-/g, ' '); // intending for the title to use dashes instead of spaces, but this doesn't allow you to include dashes in the actual text.
    let caption_with_spaces = req.params["caption"].replace(/-/g, ' ');

    const { data, error } = await supabase
      .from('posts')
      .insert([{id : crypto.randomUUID(), // copilot ai'ed this but it seems to work
      created_at : getFormattedTimestamp(), // also copilot ai'ed this, this function (which is above) converts a javascript Date() object to a timestamptz object
      user_id : req.params["userID"],
      title : title_with_spaces,
      caption : caption_with_spaces}])
      .select()
    
    console.log("Success")
    if (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).send('Error fetching posts');
    }

    res.json(data);
  } catch (err){
    console.error('Error in fetching posts:', err);
    res.status(500).send('Server error');
  }
});


// update

// delete
module.exports = router;
