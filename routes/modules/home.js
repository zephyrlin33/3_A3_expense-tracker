// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const EList = require('../../models/expense')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
// 定義首頁路由
router.get('/', (req, res) => {

  const userId = req.user._id

  EList.find({ userId })
    .lean()
    .then(expense => {
      let totalAmount = 0
      for (let i = 0; i < expense.length; i++) {
        totalAmount += expense[i].number
      }

      res.render('index', { expense, totalAmount })
    })
    .catch(error => console.error(error))

})

// 搜尋設定
router.get('/search', (req, res) => {

  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  const userId = req.user._id

  EList.find({ userId })
    .lean()
    .then(expense => {
      const filterExpenseData = expense.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { expense: filterExpenseData, keywords })
    })
    .catch(err => console.log(err))
})



// 匯出路由模組
module.exports = router