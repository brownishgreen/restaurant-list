const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {

  const page = parseInt(req.query.page) || 1
  const limit = 6
  const userId = req.user.id

  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating', 'description'],
    where: {userId} ,
    offset: (page - 1) * limit,
    limit,
    raw: true
  })
    .then((restaurants) => {
      res.render('index', {
        restaurants,
        prev: page > 1 ? page - 1 : page,
        next: page + 1,
        page
      })
    })
    .catch((err) => {
      err.errorMessage = '資料取得失敗 ;('
      next(err)
    })
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res, next) => {
  const body = req.body
  const userId = req.user.id

    return Restaurant.create({
      name: body.name,
      category: body.category,
      rating: body.rating,
      location: body.location,
      phone: body.phone,
      description: body.description,
      image: body.image,
      userId: userId
    })
      .then(() => {
        req.flash('success', '您成功新增了一間餐廳!')
        res.redirect('/restaurant-list')
      })
      .catch((err) => {
        err.errorMessage = '新增失敗!'
        next(err)
      })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description', 'userId'],
    raw: true
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurant-list')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurant')
      }
      res.render('detail', { restaurant })
    })
    .catch((err) => res.status(422).json(err))
})


router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'rating', 'image', 'phone', 'location', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant, error: req.flash('error') }))
    .catch((err) => {
      error.errorMessage = '編輯失敗 :('
      next(err)
    })
})


router.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const userId = req.user.id

  return Restaurant.findByPk(id, {
  attributes: ['name', 'location', 'phone', 'description', 'image', 'rating','userId']
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurant-list')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurant-list')
      }

  return Restaurant.update({
    name: body.name,
    location: body.location,
    phone: body.phone,
    description: body.description,
    image: body.image,
    rating: body.rating
  }, { where: { id } })
    .then(() => {
      req.flash('success', '您已成功更新餐廳資訊!')
      res.redirect(`/restaurant-list/${id}`)
    })
    .catch((err) => {
      err.errorMessage =  '更新失敗，請檢查輸入資料!'
      next(err)
    })
})
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  
  return Restaurant.findByPk(id)
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurant-list')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurant-list')
      }
      return Restaurant.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除餐廳成功！')
      console.log('刪除操作完成並設置了成功訊息')
      res.redirect('/restaurant-list')
    })
    .catch((err) => {
      err.errorMessage = '刪除失敗!'
      next(err)
    })
  })
})

module.exports = router