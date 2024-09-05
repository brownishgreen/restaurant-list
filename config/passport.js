const passport = require('passport')
const localStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const bcrypt = require('bcryptjs')

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
console.log('Facebook Client ID:', process.env.FACEBOOK_CLIENT_ID);
console.log('Facebook Client Secret:', process.env.FACEBOOK_CLIENT_SECRET);


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value
  const name = profile.displayName

  return User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email },
    raw: true
  })
    .then((user) => {
      if (user) return done(null, user)

      const randomPwd = Math.random().toString(36).slice(-8)

      return bcrypt.hash(randomPwd, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((user) => done(null, { id: user.id, name: user.name, email: user.email }))
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
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
        return done(null, false)
      }
      console.log('找到使用者，反序列化成功:', user)
      return done(null, user)
    })
    .catch(err => {
      console.log('反序列化過程中出錯:', err)
      return done(err, null)
    })
})

module.exports = passport