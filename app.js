const express = require('express')
const app = express()

const { engine } = require('express-handlebars')

const db = require('./models')
const Restaurant = db.Restaurant

const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 設置靜態文件目錄
app.use(express.static('public'));

app.get('/', (req, res) => {
  return Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating'],
    raw: true
  })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((err) => res.status(422.).json(err))
  res.render('index')
})

app.get('/restaurant-list', (req, res) => {
  return Restaurant.findAll()
    .then((restaurants) => res.send({ restaurants }))
    .catch((err) => res.status(422).json(err))
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

app.post('/restaurant-list/new', (req, res) => {
  res.send('add new restaurant')
})

app.put('/restaurant-list/:id/edit', (req, res) => {
  res.send('modify restaurant')
})

app.delete('/restaurant-list/:id', (req, res) => {
  res.send('delete restaurant')
})

app.listen(port, () => {
  console.log(`This app is running on http://localhost/${port}`)
})

