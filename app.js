const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/restaurant-list', (req, res) => {
  res.send('Listing restaurants')
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

