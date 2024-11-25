const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

/**
 * Get list of all posts
 */
router.get("/getPosts", async function (req, res, next) {
	try {
		// Query the "posts" table
		const { data, error } = await supabase.from("posts").select("*");

		// Console log all posts
		console.log("Posts:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Get list of all posts formatted for the dashboard page
 */
router.get("/getDashboardPosts", async function (req, res, next) {
	try {
		const { data: posts, error: postsError } = await supabase
			.from("posts")
			.select("*")
			.order("created_at", { ascending: false });
		const { data: restaurants, error: restaurantsError } = await supabase
			.from("restaurants")
			.select("*");

		if (postsError) {
			console.error("Error getting posts:", postsError);
			return res.status(500).send("Error fetching posts");
		} else if (restaurantsError) {
			Í;
			console.error("Error fetching users:", restaurantsError);
			return res.status(500).send("Error fetching users");
		}

		const dashboardPosts = posts.map((post, index) => {
			const restaurant = restaurants.find((item) => item.id === post.user_id);
			const restaurantPost = {
				user: restaurant.restaurant_name,
				userProfile: "https://via.placeholder.com/30x30",
				title: post.title,
				caption: post.caption,
				mediaLinks: post.media_links || [],
				createdAt: post.created_at,
			};
			return restaurantPost;
		});

		console.log(dashboardPosts);
		res.json(dashboardPosts);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Get list of posts sorted by timestamp descending
 */
router.get("/readbytimestamp", async function (req, res, next) {
	try {
		// Query the "posts" table
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.order("created_at", { ascending: false });
		if (error) {
			console.error("Error fetching posts:", error);
			return res.status(500).send("Error fetching posts");
		}

		// Console log all posts
		console.info("Posts:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Get post with post_id
 */
router.get("/read/post/:post_id", async function (req, res, next) {
	try {
		const post_id = req.params.post_id;

		// Query the "posts" table
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.eq("id", post_id);

		// Handle errors
		if (error) {
			console.error("Error fetching posts:", error);
			return res.status(500).send("Error fetching posts");
		}

		// Console log all posts
		console.info("Posts:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Get post with user_id
 */
router.get("/read/user/:user_id", async function (req, res, next) {
	try {
		const user_id = req.params.user_id;

		// Query the "posts" table
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.eq("user_id", user_id);

		// Handle errors
		if (error) {
			console.error("Error fetching posts:", error);
			return res.status(500).send("Error fetching posts");
		}

		// Console log all posts
		console.info("Posts:", data);

		// Send the posts as a response
		res.json(data);
	} catch (err) {
		console.error("Error in fetching posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Create new post
 */
router.post("/create/", async function (req, res, next) {
	try {
		// create
		const { title, caption, media_links, user_id } = req.body;
		const newPost = {
			user_id: user_id,
			title: title,
			caption: caption,
			media_links: media_links,
		};

		const { data, error } = await supabase
			.from("posts")
			.insert([newPost])
			.select();

		console.info("Success");
		if (error) {
			console.error("Error creating posts:", error);
			return res.status(500).send("Error creating posts");
		}

		res.json(data);
	} catch (err) {
		console.error("Error in creating posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Update post
 */
router.put("/update/", async function (req, res, next) {
	try {
		const { title, caption, media_links, id } = req.body;
		const newPost = {};
		title ? (updateObject.title = title) : null;
		caption ? (updateObject.caption = caption) : null;
		media_links ? (updateObject.media_links = media_links) : null;

		const { data, error } = await supabase
			.from("posts")
			.update(newPost)
			.eq("id", id)
			.select();

		res.json(data);
		if (error) {
			console.error("Error updating posts:", error);
			return res.status(500).send("Error updating posts");
		}
	} catch (err) {
		console.error("Error in creating posts:", err);
		res.status(500).send("Server error");
	}
});

/**
 * Delete post
 */
router.delete("/delete/", async function (req, res, next) {
	try {
		const { id } = req.body;
		const { data, error } = await supabase.from("posts").delete().eq("id", id);

		if (error) {
			console.error("Error deleting posts:", error);
			return res.status(500).send("Error deleting posts");
		}

		res.json(data);
	} catch (err) {
		console.error("Error in deleting posts:", err);
		res.status(500).send("Server error");
	}
});

module.exports = router;
