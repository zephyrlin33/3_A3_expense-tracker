const express = require('express')
const router = express.Router()
const EList = require('../../models/expense')



// 新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})


//編輯頁面
router.get('/:expense_id/edit', (req, res) => {
  const _id = req.params.expense_id
  const userId = req.user._id
  
  EList.findOne({ _id, userId })
    .lean()
    .then(expense => {
      const date=expense.date
      res.render('edit', { expense , date})})
    .catch(error => console.log(error))
})

//新增動作
router.post('/', (req, res) => {

  const userId = req.user._id
  req.body['userId'] = userId  //在req.body物件中新增userId properties

  return EList.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//修改動作
router.put('/:expense_id/', (req, res) => {
  const _id = req.params.expense_id
  EList.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除動作
router.delete("/:expense_id/", (req, res) => {

  const _id = req.params.expense_id
  const userId = req.user._id

  EList.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router