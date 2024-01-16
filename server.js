const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')
const multer = require('multer')
const path = require('path')
// const ejs = require('ejs')
const postController = require('./controllers/postController')
const app = express()
const session = require('express-session')
const { login } = require('./controllers/userController')
const isAuth = require('./middlewares/auth')
const Post = require('./models/postmodel')



const port = 4000;
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'echemartins', // Change this to a secret key for session encryption (keep it secure)
    resave: false,
    saveUninitialized: false
}));

app.use('/api',router)
app.get('/',isAuth,postController.getAllPosts,)
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signUp')
})
// app.get('/members',(req,res)=>{
//     res.render('members')
// })









mongoose.connect('mongodb://127.0.0.1:27017/Churchdb'
// {useNewurlParser:true,
//     useUnifiedTopology:true
// }
).then(()=>{
    console.log('connected to mongodb')
}).catch((error)=>{
    console.error('mongoDb connection error', error)
})

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})

// async function checkPost(){
//   const posts = await Post.find({})
//   console.log(posts[posts.length - 1])
// }

// checkPost()