// Import necessary modules and the Post model
const Post = require('../models/postmodel');
const User = require('../models/usermodel'); // Assuming you have a User model
const multer = require('multer')

// Controller functions
const postController = {
    // Create a new post
    createPost: async (req, res) => {
        try {
            // Extract data from the request body
            const userId = req.user._id
            const {content} = req.body;
            const file = req.myFile
            const files = req.files

            const fileNames = files.map(file => file.filename);

            console.log(files)
            const posts = await Post.find().populate('user', ['username','image']); // Populate user details

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create a new post
            const newPost = new Post({
                user: userId,
                content,
                file: fileNames
            });

            // Save the post to the database
            const savedPost = await newPost.save();

            // return res.status(201).json(savedPost);
            res.redirect('/');
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            // Fetch all posts from the database
            // console.log(req.user)
            const user = req.user
            // console.log(user)
            const posts = await Post.find().populate('user', ['username','image']); // Populate user details
            // console.log(posts)
            const files = posts.map(post => post.file)
            console.log(files)

            res.render('index', {posts,user,files});
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    // Get post by ID
    getPostById: async (req, res) => {
        try {
            // Extract post ID from the request parameters
            const postId = req.params.id;

            // Fetch the post by ID from the database
            const post = await Post.findById(postId).populate('user', 'username'); // Populate user details

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            return res.status(200).json(post);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    // Delete post by ID
    deletePostById: async (req, res) => {
        try {
            // Extract post ID from the request parameters
            const postId = req.params.id;

            // Find and delete the post by ID
            const deletedPost = await Post.findByIdAndDelete(postId);

            if (!deletedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = postController;
