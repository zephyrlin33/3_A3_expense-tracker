const express = require('express')
const router = express.Router()
const RList = require('../../models/restaurant')



//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  RList.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))//注意傳進去的變數要與樣板一致
    .catch(error => console.log(error))

})

//編輯餐廳
router.get('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params

  RList.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//新增餐廳
router.post('/', (req, res) => {

  return RList.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//儲存新編輯
router.put('/:restaurant_id/', (req, res) => {
  const { restaurant_id } = req.params
  RList.findByIdAndUpdate(restaurant_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete("/:restaurant_id/", (req, res) => {
  const { restaurant_id } = req.params
  RList.findById(restaurant_id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router