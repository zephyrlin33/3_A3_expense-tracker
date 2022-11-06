// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const EList = require('../../models/expense')


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
router.post('/search', (req, res) => {

  const userId = req.user._id
  EList.find({ userId })
    .lean()
    .then(expense => {
      
      if(req.body.categoryId==6){

        return res.redirect('/')
      }
      else{
        const filterExpenseData = expense.filter(
        data =>
          data.categoryId == req.body.categoryId
      )
      let totalAmount = 0
      for (let i = 0; i < filterExpenseData.length; i++) {
        totalAmount += filterExpenseData[i].number
      }
      res.render("index", { expense: filterExpenseData, totalAmount })}
    })
    .catch(err => console.log(err))
})



// 匯出路由模組
module.exports = router