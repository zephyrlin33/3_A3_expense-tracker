// 總路由器
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')//引入home
const expense = require ('./modules/expense')
const users = require ('./modules/users')
const { authenticator } = require('../middleware/auth') // 掛載 middleware
const auth = require('./modules/auth')  

// 準備引入路由模組
router.use('/expense', authenticator, expense)//接到restaurants.js中的路由設定
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)//接到home.js中的路由設定

// 匯出路由器
module.exports = router