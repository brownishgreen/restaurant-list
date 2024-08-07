const express = require('express')
const router = express.Router()
const users = require('./users')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value
  const name = profile.displayName

  return User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email },
    raw: true
  })
    .then((user) => {
      if (user) return done(null, user)

      const randomPwd = Math.random().toString(36).slice(-8)

      return bcrypt.hash(randomPwd, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((user) => done(null, { id: user.id, name: user.name, email: user.email }))
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })

}))

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook',
  passport.authenticate('facebook', {
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
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
