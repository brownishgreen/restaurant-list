const express = require('express')
const router = express.Router()
const users = require('./users')

const passport = require('passport')

const db = require('../models')
const User = db.User


router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook',
  passport.authenticate('facebook', {
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))



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
