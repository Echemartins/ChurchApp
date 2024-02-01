const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/usermodel')
const post = require('../models/postmodel')
const multer = require('multer')
const session = require('express-session')
// const path = require('path')

async function registerUser(req,res){
    try {
        // console.log(req.myFile)
        const { username, email, password,role,zone,organization,piusSociety} = req.body;
        if (!username ||!email ||!password ) {
           return res.json("some fields `are compulsory");
        }
        const image = req.myFile
        if(!image){
            return res.json('no file uploaded')
        }
       console.log(image)
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
         return res.send("user Already exists");
        }
        const hashedPassword = await bcrypt.hash(password,10)
        newUser = new userModel({ username, email, password:  hashedPassword,role,zone,organization,piusSociety,image});
        await newUser.save();
        res.status(200).json(" registration succesful",);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }

    // req.session.userId = user._id;
    // res.cookie('sessionCookie', user._id, {maxAge: 3600000, path: '/'})
}

async function login (req, res){
    const { username, password } = req.body;
    const posts = await post.find().populate('user',['username','image'])
    // const posts = await Post.find().populate('user', 'username'); // Populate user details
    try {
      // Find the user by username in the database
      const user = await userModel.findOne({ username });
        // console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set the session or token to manage user authentication (e.g., using JWT)
        // For example, set a session cookie
        req.session.userId = user._id;
        res.render('index', {posts,user})
        // return res.status(200).json({ message: 'Login successful', user });
      } else {
        return res.status(401).json({ message: 'Invalid credentials'});
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

async function deleteUser(req,res){
    try{
        const{email} = req.body
        if(!email){
            return res.json('email must be provided')
        }
        // const user = await userModel.find({email})
        const user = await userModel.findOneAndDelete({email})
        res.json({user,message: 'user deleted succesfully'})
    }
    catch(error){
        console.log('error deleting user', error)
    }
}

async function getUsers(req,res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {

        // Fetch data from MongoDB (example: fetching all users)
        const users = await userModel.find().skip(skip).limit(limit).exec()
    
        const totalItems = await userModel.countDocuments(); // Get total count of items in the collection

        const totalPages = Math.ceil(totalItems / limit);
    
        const result = {
          users,
          totalPages,
          currentPage: page,
        };

        console.log(req.query)
    
        // res.json(result);
        // Render the EJS template and pass fetched data to the template
        res.render('members', { result });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
};

async function getSocieties(req,res){
    res.render('piusSocieties')
}

async function getSacredHeart (req,res){
    try {
        const sacredHeart = await userModel.find({piusSociety:'Sacred Heart'})
        res.render('listmembers',{ sacredHeart })
    } catch (error) {
        console.error(error, 'the error')
    }
}

async function getStAnthony (req,res){
    try {
        const stAnthony = await userModel.find({piusSociety:'St. Anthony'})
        res.render('listAnthonyMembers',{ stAnthony })
    } catch (error) {
        console.error(error, 'anthony error')
    }
}




module.exports = {registerUser,getUsers,getSocieties,getSacredHeart,getStAnthony,deleteUser, login}