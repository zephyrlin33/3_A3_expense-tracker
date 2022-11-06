const express = require('express')
const router = express.Router()
const RList = require('../../models/restaurant')


// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  RList.findOne({_id, userId})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))//注意傳進去的變數要與樣板一致
    .catch(error => console.log(error))

})

//顯示編輯特定餐廳
router.get('/:restaurant_id/edit', (req, res) => {
  const _id  = req.params.restaurant_id
  const userId = req.user._id

  RList.findOne({_id, userId})
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//新增餐廳
router.post('/', (req, res) => {

  const userId = req.user._id
  
  req.body.userId =userId  //在req.body物件中新增userId properties
  return RList.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//儲存新編輯
router.put('/:restaurant_id/', (req, res) => {
  const _id= req.params.restaurant_id
  RList.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete("/:restaurant_id/", (req, res) => {

  const _id = req.params.restaurant_id
  const userId = req.user._id

  RList.findOne({_id,userId})
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router