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

// Read by User ID
router.get("/read/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;

    // Query the "posts" table
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', user_id);
    
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

// Read by First/Last Name
router.get("/read/:FName/:LName", async function (req, res, next) {
  try {
    const FName = req.params.FName;
    const LName = req.params.LName;

    // Query the "posts" table
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('first_name', FName)
      .eq('last_name', LName);
    
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

// Create
router.post("/create/", async function (req, res, next) {
  try {
    // create
    const {userID, FName, LName, username} = req.body;

    const { data, error } = await supabase
      .from('customers') 
      .insert([{id : userID,
      first_name : FName,
      last_name : LName,
      username: username}])
      .select()
    
    console.log("Success")
    if (error) {
      console.error('Error creating Customer:', error);
      return res.status(500).send('Error creating Customer');
    }

    res.json(data);
  } catch (err){
    console.error('Error in creating Customer:', err);
    res.status(500).send('Server error');
  }
});


// Update
router.put("/update/", async function (req, res, next){
  try {
    const {userID, FName, LName, Bio} = req.body; 
    const { data, error } = await supabase
      .from('customers')
      .update({'first_name': FName, 'last_name': LName, 'bio_description':Bio})
      .eq('id', userID)
      .select()
    
    res.json(data);
    if (error){
      console.error('Error updating customers:', error);
      return res.status(500).send('Error updating customers')
    }
  } catch (err){
      console.error('Error in creating customers:', err);
      res.status(500).send('Server error')
  }
})

// Delete
router.delete("/delete/", async function (req, res, next){
  try {
    const {userID} = req.body;
    const { data, error } = await supabase
    .from('customers')
    .delete()
    .eq('id', userID)

    if (error){
      console.error('Error deleting customer:', error);
      return res.status(500).send('Error deleting customer');
    }

    res.json(data);
  } catch (err){
    console.error('Error in deleting customer:', err);
    res.status(500).send('Server error')
  }
})


module.exports = router;