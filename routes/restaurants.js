var express = require("express");
var router = express.Router();
var supabase = require("../supabase");

// read all
router.get("/read/", async function (req, res, next) {
    try {
        const {data, error} = await supabase
            .from("restaurants")
            .select("*");
        if (error) {
            console.error('Error fetching restaurants:', error);
            return res.status(500).send('Error fetching restaurants');
        }

        console.log("Restaurants:", data);
        res.json(data);
    } catch (err) {
        console.error('Error in fetching restaurants:', err);
        res.status(500).send('Server error');
    }


});

// read by restaurantID
router.get("/read/:restaurantID", async function (req, res, next) {
    try {
        const rID = req.params.restaurantID;
        const {data, error} = await supabase
            .from("restaurants")
            .select("*")
            .eq("id", rID);
        
        if (error) {
            console.error('Error in fetching restaurants:', error);
            return res.status(500).send('Error fetching restaurants');
        }
        res.json(data);
    } catch(err){
        console.error('Error in fetching restaurants:', err);
        res.status(500).send('Server error');
    }

});

// Get tags by Restaurants
router.get("/readTagsByRestaurant/:restaurantID", async function (req, res, next) {
    try {
      const rID = req.params.restaurantID;
      const {data, error} = await supabase
        .rpc('tagsbyrestaurants', {restaurantid: rID});
      if (error){
        console.error("Error in fetching tags:", error);
        return res.status(500).send("Error fetching tags");
      }
      console.log(data);
      res.json(data);

    } catch (err){
      console.error("Error in fetching tags:", err);
      res.status(500).send("Server error");
    }

});

// Get restaurants by tagsa
router.get("/readRestaurantsByTag/:tagID", async function (req, res, next) {
  try {
    const tID = req.params.tagID;
    const {data, error} = await supabase
      .rpc('restaurantsbytag', {tagid: tID});
    if (error){
      console.error("Error in fetching restaurants:", error);
      return res.status(500).send("Error fetching tags");
    }
    console.log(data);
    res.json(data);
  } catch (err){
    console.error("Error in fetching restaurants:", err);
    res.status(500).send("Server error");
  }
});

// Read by Restaurant Name
router.get("/read/name/:restaurantName", async function (req, res, next) {
    try {
      const rName = req.params.restaurantName.replace(/_/g, ' ');
  
      // Query the "posts" table
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('restaurant_name', rName);
      
      if (error) {
        console.error('Error fetching restaurants:', error);
        return res.status(500).send('Error fetching restaurants');
      }
  
      // Console log all posts
      console.log('Restaurants:', data);
  
      // Send the posts as a response
      res.json(data);
    } catch (err) {
        console.error('Error in fetching Restaurants:', err);
        res.status(500).send('Server error');
    }
  });

// Create
router.post("/create/", async function (req, res, next) {
    try {
      // create
      const {userID, restaurantName, streetAddress, City, State} = req.body;
  
      const { data, error } = await supabase
        .from('restaurants') 
        .insert([{id : userID,
        restaurant_name : restaurantName,
        street_address : streetAddress,
        city: City,
        state: State}])
        .select();
      
      console.log("Success")
      if (error) {
        console.error('Error creating Restaurant:', error);
        return res.status(500).send('Error creating Restaurant');
      }
  
      res.json(data);
    } catch (err){
      console.error('Error in creating Restaurant:', err);
      res.status(500).send('Server error');
    }
  });

// Update
router.put("/update/", async function (req, res, next){
    try {
      const {userID, restaurantName, streetAddress, City, State, Bio} = req.body; 
      const { data, error } = await supabase
        .from('restaurants')
        .update({'restaurant_name': restaurantName, 'street_address': streetAddress, 'city':City, 'state':State, 'bio_description':Bio})
        .eq('id', userID)
        .select();
      
      res.json(data);
      if (error){
        console.error('Error updating restaurants:', error);
        return res.status(500).send('Error updating restaurants')
      }
    } catch (err){
        console.error('Error in creating restaurants:', err);
        res.status(500).send('Server error')
    }
  });

// Delete
router.delete("/delete/", async function (req, res, next){
    try {
      const {userID} = req.body;

      const { data, error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', userID);
  
      if (error){
        console.error('Error deleting restaurant:', error);
        return res.status(500).send('Error deleting restaurant');
      }
      console.log(data);
      res.json(data);
    } catch (err){
      console.error('Error in deleting restaurant:', err);
      res.status(500).send('Server error')
    }
  });

module.exports = router;
