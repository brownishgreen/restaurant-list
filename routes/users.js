const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

router.post('/', (req, res, next) => {
  console.log(req.body)
  const { email, name, password, confirmPassword } = req.body

  if (!email || !password) {
    req.flash('error', 'email 及 password 為必填欄位')
    return res.redirect('back')
  }

  if (password !== confirmPassword) {
    req.flash('error', '驗證密碼與密碼不符')
    return res.redirect('back')
  }

  return User.count({ where: { email } })
    .then((rowCount) => {
      if (rowCount > 0) {
        req.flash('error', 'email已經註冊')
        return res.redirect('back')
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          return User.create({ email, name, password:hash })
            .then(() => {
              req.flash('success', '註冊成功')
              return res.redirect('/login')
            })
            .catch((err) => {
              console.error('註冊過程中發生錯誤：', err) // 打印錯誤訊息到終端
              req.flash('error', '註冊失敗')
              return res.redirect('back')
            })
        })
    })
})

module.exports = router