const express = require('express')
// const app = express()
const userRouter = require('./userRoutes')
const postRoute = require('./postRoute')
const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRoute)

module.exports = router