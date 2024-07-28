const express = require('express')
const router = express.Router()

const restaurant = require('./restaurant')

router.use('/restaurant-list', restaurant)

router.get('/', (req, res) => {
  res.redirect('/')
})

module.exports = router
