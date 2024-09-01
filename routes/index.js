const express = require('express')
const router = express.Router()

const restaurant = require('./restaurant')

router.use('/restaurant-list', restaurant)
// 定義路由處理器 基本路徑
router.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

module.exports = router