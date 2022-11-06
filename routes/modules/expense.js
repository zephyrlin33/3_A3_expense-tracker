const express = require('express')
const router = express.Router()
const EList = require('../../models/expense')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//瀏覽特定餐廳
router.get('/:expense_id', (req, res) => {
  const _id = req.params.expense_id
  const userId = req.user._id
  EList.findOne({_id, userId})
    .lean()
    .then(expense => res.render('show', { expense }))//注意傳進去的變數要與樣板一致
    .catch(error => console.log(error))

})

//顯示編輯特定餐廳
router.get('/:expense_id/edit', (req, res) => {
  const _id  = req.params.expense_id
  const userId = req.user._id

  EList.findOne({_id, userId})
    .lean()
    .then(expense => res.render('edit', { expense }))
    .catch(error => console.log(error))
})

//新增
router.post('/', (req, res) => {

  const userId = req.user._id
  req.body.userId =userId  //在req.body物件中新增userId properties

  
  return EList.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//儲存新編輯
router.put('/:expense_id/', (req, res) => {
  const _id= req.params.expense_id
  EList.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete("/:expense_id/", (req, res) => {

  const _id = req.params.expense_id
  const userId = req.user._id

  EList.findOne({_id,userId})
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router