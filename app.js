const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
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

app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

app.get('/restaurant-list', (req, res) => {
  return Restaurant.findAll({
    attributes: ['id', 'name', 'category', 'image', 'rating'],
    raw: true
  })
    .then((restaurants) => res.render('index', { restaurants, message: req.flash('success'), error: req.flash('error') }))
    .catch((err) => res.status(422.).json(err))
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
    .then((restaurant) => res.render('detail', { restaurant, message: req.flash('success'), error: req.flash('error') }))
    .catch((err) => res.status(422).json(err))
})

app.get('/restaurant-list/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'category', 'image', 'phone', 'location', 'description', 'rating'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant, error: req.flash('error')}))
})

app.post('/restaurant-list', (req, res) => {
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


app.put('/restaurant-list/:id', (req, res) => {

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

app.delete('/restaurant-list/:id', (req, res) => {
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

app.listen(port, () => {
  console.log(`This app is running on http://localhost/${port}`)
})

