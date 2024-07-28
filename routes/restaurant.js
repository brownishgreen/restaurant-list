const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
  const keyword = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = 9;

  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating', 'description'],
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = restaurants.filter(rt => {
        const nameMatch = rt.name.toLowerCase().includes(keyword.toLowerCase());
        const categoryMatch = rt.category.toLowerCase().includes(keyword.toLowerCase());
        const descriptionMatch = rt.description.toLowerCase().includes(keyword.toLowerCase());
        return nameMatch || categoryMatch || descriptionMatch;
      });
      res.render('index', {
        restaurants: matchedRestaurants.slice((page - 1) * limit, page * limit),
        keyword,
        prev: page > 1 ? page - 1 : page,
        next: page * limit < matchedRestaurants.length ? page + 1 : page,
        page
      });
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗:(';
      next(error);
    });
});

  router.get('/new', (req, res, next) => {
    return res.render('new')
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description'],
      raw: true
    })
      .then((restaurant) => res.render('detail', { restaurant, error: req.flash('error') }))
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

  router.post('/', (req, res, next) => {
    const body = req.body
    return Restaurant.create({
      name: body.name,
      category: body.category,
      location: body.location,
      phone: body.phone,
      description: body.description,
      image: body.image,
      rating: body.rating
    })
      .then(() => {
        req.flash('success', '新增成功!')
        return res.redirect('/restaurant-list')
      })
      .catch((error) => {
        error.errorMessage = '新增失敗!'
        next(error)
      })
  })


  router.put('/:id', (req, res, next) => {

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
      .catch((error) => {
        error.errorMessage = '編輯失敗!'
        next(error)
      })
  })

  router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    return Restaurant.destroy({ where: { id } })
      .then(() => {
        req.flash('success', '刪除成功!')
        return res.redirect('/restaurant-list')
      })
      .catch((error) => {
        error.errorMessage = '刪除失敗!'
        next(error)
      })
  })

  module.exports = router