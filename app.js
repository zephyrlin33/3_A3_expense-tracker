const express = require ('express')
const session = require('express-session')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override


const routes = require('./routes')// 引用路由器

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000


// 設定引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))// 設定靜態路徑

// 每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


usePassport(app)

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 將 request 導入路由器
app.use(routes)


  // start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })