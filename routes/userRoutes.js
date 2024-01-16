const upload = require('../middlewares/filleUploader')
const express = require('express')
const isAuth = require('../middlewares/auth')
const {registerUser, getUsers, getSocieties, getSacredHeart, getStAnthony, deleteUser, login} = require('../controllers/userController');
// const router = require('./route');
const userRouter = express.Router()

userRouter.post('/register',upload.single('image'), registerUser);
userRouter.get('/members',isAuth, getUsers);
userRouter.post('/login', login);
userRouter.get('/piusSociety',getSocieties);
userRouter.get('/sacredHeart',getSacredHeart);
userRouter.get('/stAnthony',getStAnthony);
userRouter.delete('/deleteAccount',deleteUser)



module.exports = userRouter