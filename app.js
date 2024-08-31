const express = require('express')
const app = express()
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const { engine } = require('express-handlebars')

const port = 3000

const db = require('./models')
const Restaurant = db.Restaurant

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

app.get('/restaurant-list', (req, res) => {
  Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating', 'description', 'rating'],
    raw: true
  })
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/restaurant-list/new', (req, res) => {
  console.log('Rendering new.hbs')
  res.render('new')
})

app.post('/restaurant-list', (req, res) => {
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
    .then(() => res.redirect('/restaurant-list'))
    .catch((err) => console.log(err))
})

app.get('/restaurant-list/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((err) => res.status(422).json(err))
})


app.get('/restaurant-list/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => res.status(422).json(err))
})

app.put('/restaurant-list/:id', (req, res) => {
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
  .then(() => res.redirect(`/restaurant-list/${id}`))
})

app.delete('/restaurant-list/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
  .then(() => res.redirect('/'))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})