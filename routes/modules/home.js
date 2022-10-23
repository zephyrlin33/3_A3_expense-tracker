// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RList = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
       
    RList.find() // 取出  model 裡的所有資料
     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
     .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
     .catch(error => console.error(error)) // 錯誤處理
 
})

// 搜尋設定
router.get('/search', (req, res) => {
    const keywords = req.query.keyword
    const keyword=keywords.trim().toLowerCase()
  
    RList.find({})
      .lean()
      .then(restaurants => {
        const filterRestaurantsData = restaurants.filter(
          data =>
            data.name.toLowerCase().includes(keyword) ||
            data.category.includes(keyword)
        )
        res.render("index", { restaurants: filterRestaurantsData, keywords })
      })
      .catch(err => console.log(err))
  })

// 匯出路由模組
module.exports = router