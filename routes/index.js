const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const users = require('./users')


const passport = require('passport')
const localStrategy = require('passport-local')

const db = require('../models')
const User = db.User

passport.use(new localStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user) {
        console.log('使用者不存在', username)
        return done(null, false, { message: 'email 或密碼錯誤' })
      }
      console.log('找到使用者:', user)

          if (user.password === password) {
            console.log('密碼為明文，將其加密後儲存')
            return bcrypt.hash(password, 10)
              .then((hash) => {
                return User.update({ password: hash }, { where: { id: user.id } })
                  .then(() => {
                    console.log('密碼加密成功並更新到資料庫')
                    return done(null, user)
                })
            })
            }
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            console.log('密碼比對失敗:', password, user.password)
            return done(null, false, { message: 'email 或密碼錯誤' })
          }
          console.log('密碼比對成功，登入成功:', user)
          return done(null, user);
      })
    })
    .catch((error) => {
      console.log('登入過程中出錯:', error)
      error.errorMessage = '登入失敗'
      return done(error)
    })
}))

passport.serializeUser((user, done) => {
  console.log('序列化使用者:', user.id)
  return done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('反序列化使用者:', id);  // 反序列化過程中的日誌
  // 根據ID從資料庫中查詢使用者
  User.findByPk(id)
    .then(user => {
      if (!user) {
        console.log('找不到使用者:', id)
        return done(null,false)
      }
      console.log('找到使用者，反序列化成功:', user)
      return done(null, user)
    })
    .catch(err => {
      console.log('反序列化過程中出錯:', err)
      return done(err, null)
    })
})

const restaurant = require('./restaurant')
const authHandler = require('../middlewares/auth-handler')

router.use('/restaurant-list',authHandler, restaurant)
router.use('/users', users)
// 定義路由處理器 基本路徑
router.get('/', (req, res) => {
  res.redirect('/restaurant-list')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/restaurant-list',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    return res.redirect('/login')
  })
})



module.exports = router