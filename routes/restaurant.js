const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res) => {
  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating', 'description', 'rating'],
    raw: true
  })
    .then((restaurants) => {
      res.render('index', { restaurants, message: req.flash('success') })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (req, res) => {
  console.log('Rendering new.hbs')
  res.render('new', { error: req.flash('error') })
})

router.post('/', (req, res) => {
  try {
    const body = req.body
    return Restaurant.create({
      name: body.name,
      category: body.category,
      rating: body.rating,
      location: body.location,
      phone: body.phone,
      description: body.description,
      image: body.image
    })
      .then(() => {
        req.flash('success', '您成功新增了一間餐廳!')
        res.redirect('/restaurant-list')
      })
      .catch((err) => {
        console.log(err)
        req.flash('error', '新增失敗!')
        return res.redirect('back')
      })
  } catch (error) {
    console.error(error)
    req.flash('error', '新增失敗:(')
    return res.redirect('back')
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('detail', { restaurant, message: req.flash('success') }))
    .catch((err) => res.status(422).json(err))
})


router.get('/:id/edit', (req, res) => {
  try {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      attributes: ['id', 'name', 'category', 'rating', 'image', 'phone', 'location', 'description'],
      raw: true
    })
      .then((restaurant) => res.render('edit', { restaurant, error: req.flash('error') }))
      .catch((error) => {
        console.error(error)
        req.flash('error', '編輯失敗:(')
        return res.redirect('back')
      })
  } catch (error) {
    console.error(error)
    req.flash('error', '編輯失敗:(')
    return res.redirect('back')
  }
})

router.put('/:id', (req, res) => {
  const body = req.body
  const id = req.params.id

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
      console.error(err)
      req.flash('error', '更新失敗，請檢查輸入資料!')
      res.redirect('back')
    })
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除餐廳成功！')
      res.redirect('/')
    })
})

module.exports = router