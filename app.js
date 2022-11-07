const express = require ('express')
const session = require('express-session')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash')   // 提示錯訊息flash message

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')// 引用路由器

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const icon = ['<span style="color: Dodgerblue;"><i class="fa-solid fa-house fa-5x"></i></span>', 
            '<span style="color: Dodgerblue;"><i class="fa-solid fa-van-shuttle fa-5x"></i></span>',
            '<span style="color: Dodgerblue;"><i class="fa-solid fa-face-grin-beam fa-5x"></i></span>',
            '<span style="color: Dodgerblue;"><i class="fa-solid fa-utensils fa-5x"></i></span>',
            '<span style="color: Dodgerblue;"><i class="fa-solid fa-pen fa-5x"></i></span>']

// 設定引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' ,helpers: {
  icon: function (a) {
    return icon[a-1]
  }}}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))// 設定靜態路徑

// 每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


usePassport(app)
app.use(flash())  // 掛載套件

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)


  // start and listen on the Express server
app.listen(PORT, () => {
    console.log(`Express is listening on localhost:${PORT}`)
  })