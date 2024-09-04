const express = require('express')
const router = express.Router()
const users = require('./users')

const passport = require('passport')
const localStrategy = require('passport-local')

const db = require('../models')
const User = db.User

passport.use(new localStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user || user.password !== password) {
        return done(null, false, { message: 'email 或密碼錯誤' })
      }
      return done(null, user)
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  const { id, name, email } = user
  return done(null, { id, name, email })
})

const restaurant = require('./restaurant')

router.use('/restaurant-list', restaurant)
router.use('/users', users)
// 定義路由處理器 基本路徑
router.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  return res.render('login')
})



module.exports = router