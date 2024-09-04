const express = require('express')
const router = express.Router()
const users = require('./users')

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

router.post('/login', (req, res) => {
  return res.send(req.body)
  
})

router.post('/logout', (req, res) => {
  return res.render('login')
})



module.exports = router