const express = require('express')
const app = express()
const methodOverride = require('method-override')

const { engine } = require('express-handlebars')

const db = require('./models')
const Restaurant = db.Restaurant

const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 設置靜態文件目錄
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // 解析表單數據
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating'],
    raw: true
  })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((err) => res.status(422.).json(err))
})

app.get('/restaurant-list', (req, res) => {
  res.redirect('/')
})

app.get('/restaurant-list/new', (req, res) => {
  res.render('new')
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
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description','rating'],
    raw: true
  })
  .then((restaurant) => res.render('edit', { restaurant }))
})

app.post('/restaurant-list', (req, res) => {
  const body = req.body
  return Restaurant.create({
    name: body.name,
    category: body.category,
    location: body.location,
    phone: body.phone,
    description: body.description,
    image: body.image
  })
    .then(() => res.redirect('/restaurant-list'))
  .catch((err) => console.log(err))
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
  console.log(`This app is running on http://localhost/${port}`)
})

