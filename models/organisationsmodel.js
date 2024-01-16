// Require necessary packages and setup
const mongoose = require('mongoose');

// Define the Category schema
const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Category model based on the schema
const Category = mongoose.model('Category', categorySchema);

// Export the Category model to use in other parts of the application
module.exports = Category;
