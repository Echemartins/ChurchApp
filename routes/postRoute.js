const upload = require('../middlewares/filleUploader')
const express = require('express')
const {createPost,getAllPosts} = require('../controllers/postController');
const isAuth = require('../middlewares/auth')
// const router = require('./route');
const postRouter = express.Router()

postRouter.post('/createpost',isAuth,upload.array('file', 10),createPost);
postRouter.get('/getposts', getAllPosts);




module.exports = postRouter