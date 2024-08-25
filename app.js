const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/restaurant-list', (req, res) => {
  res.send('listing restaurants')
})

app.get('/restaurant-list/:id', (req, res) => {
  res.send('individual restaurant detail page')
})

app.get('/restaurant-list/new', (req, res) => {
  res.send('add restaurant')
})

app.get('/restaurant-list/:id/edit', (req, res) => {
  res.send(`edit restaurant ${id}`)
})

app.delete('/restaurant-list/:id', (req, res) => {
  res.send('delete restaurant')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost/${port}`)
})