const express = require('express')
const app = express()

const db = require('./models')
const Restaurant = db.Restaurant

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/restaurant-list', (req, res) => {
  return Restaurant.findAll()
    .then((restaurants) => res.send({ restaurants }))
    .catch((err) => res.status(422).json(err))
})

app.get('/restaurant-list/:id', (req, res) => {
  res.send('detail page')
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

