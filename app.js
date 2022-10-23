const express = require ('express')
//const RList = require('/models/restaurant.js') // 載入 model
const exphbs = require('express-handlebars')
//const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000


// 設定引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))// 設定靜態路徑
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)



 
  // start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })