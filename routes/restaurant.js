const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res) => {
  return Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating'],
    raw: true
  })
    .then((restaurants) => res.render('index', { restaurants, message: req.flash('success'), error: req.flash('error') }))
    .catch((err) => res.status(422.).json(err))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('detail', { restaurant, message: req.flash('success'), error: req.flash('error') }))
    .catch((err) => res.status(422).json(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description', 'rating'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant, error: req.flash('error') }))
})

router.post('/', (req, res) => {
  try {
    const body = req.body
    return Restaurant.create({
      name: body.name,
      category: body.category,
      location: body.location,
      phone: body.phone,
      description: body.description,
      image: body.image
    })
      .then(() => {
        req.flash('success', '新增成功!')
        return res.redirect('/restaurant-list')
      })
      .catch((err) => {
        console.log(err)
        req.flash('error', '新增失敗!')
        return res.redirect('/restaurant-list')
      })
  } catch (error) {
    console.log(err)
    req.flash('error', '新增失敗!')
    return res.redirect('/estaurant-list')
  }
})


router.put('/:id', (req, res) => {

  try {
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
        req.flash('success', '編輯成功!')
        return res.redirect(`/restaurant-list/${id}`)
      })
      .catch((err) => {
        console.log(err)
        req.flash('error', '編輯失敗!')
        return res.redirect('back')
      })
  } catch (error) {
    console.log(err)
    req.flash('error', '編輯失敗!')
    return res.redirect('back')

  }
})

router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id
    return Restaurant.destroy({ where: { id } })
      .then(() => {
        req.flash('success', '刪除成功!')
        return res.redirect('/')
      })
      .catch(() => {
        console.log(err)
        req.flash('error', '刪除失敗!')
        return res.redirect('back')
      })
  } catch (error) {
    console.log(err)
    req.flash('error', '刪除失敗!')
    return res.redirect('back')
  }
})

module.exports = router