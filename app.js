const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')

const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const app = express()

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 設置靜態文件目錄
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // 解析表單數據
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(bodyParser.json({ limit: '10mb' })); // 將限制增加到 10MB，根據需要調整
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandler)
app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`This app is running on http://localhost/${port}`)
})

