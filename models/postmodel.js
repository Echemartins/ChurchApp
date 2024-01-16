// Assuming you're using a Node.js framework like Express and an ORM like Mongoose (for MongoDB), Sequelize (for SQL databases), etc.

// Post model definition using Mongoose (for MongoDB)
const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    content: {
        type: String,
        required: true
    },
    file:[{
        type: String,
        required: true,
        min: [1,'add more images'],
        max: 10
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the User model who liked the post
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' // Reference to the User model who commented
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
