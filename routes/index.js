const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./users')
const restaurant = require('./restaurant')
const authHandler = require('../middlewares/auth-handler')


//驗證相關路由

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

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    req.flash('success', '登出成功!')
    return res.redirect('/login')

  })
})

//餐廳相關路由




router.use('/restaurant-list', authHandler, restaurant)
router.use('/users', users)
// 定義路由處理器 基本路徑
router.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

module.exports = router