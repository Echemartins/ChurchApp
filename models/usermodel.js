// Require necessary packages and setup
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // Example roles - admin and user (you can add more)
    default: 'user'
  },
  zone: {
    type: String,
    enum: ['Johnbosco', 'Holy Rosary','Patrick'], // Example roles - admin and user (you can add more)
  },
  organization: {
    type: String,
    enum: ['CWO','CMO','CYON'], // Example roles - admin and user (you can add more)
  },
  piusSociety: {
    type: String,
    enum: ['Sacred Heart', 'St. Anthony'], // Example roles - admin and user (you can add more)
    default: 'none'
  },
  image:{
    type: String,
    // default: '/Images/1d84cc8795b5e929fcdb741ba57b0129.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model to use in other parts of the application
module.exports = User;
