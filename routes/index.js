const express = require('express')
const router = express.Router()
const users = require('./users')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'email 或密碼錯誤' })
      }
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: 'email 或密碼錯誤' })
          }

          return done(null, user)
        })
    })
    })
    )

passport.serializeUser((user, done) => {
  const { id, name, email } = user
  return done(null, {id , name, email})
})

passport.deserializeUser((user, done) => {
  done(null, {id: user.id })
})

const restaurant = require('./restaurant')
const authHandler = require('../middlewares/auth-handler')

router.use('/restaurant-list', authHandler, restaurant)
router.use('/users', users)

router.get('/', (req, res) => {
  res.redirect('/')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    return res.redirect('/login')
  })
})

module.exports = router
