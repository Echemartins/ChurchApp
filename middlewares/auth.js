const session = require('express-session')
const userModel = require('../models/usermodel')

const isAuth = async(req, res, next) => {
    if (req.session && req.session.userId) {
        const user = await userModel.findById(req.session.userId)
        req.user = user
        // console.log(user)
      return next();
    } else {
      return res.redirect('/login');
    }
  };


  module.exports = isAuth