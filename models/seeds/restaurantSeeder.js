const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const RList = require('../../restaurant.json').results // 載入 restaurant model
const User = require('../user')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

const User01 = {
  name: 'User01',
  email: 'user1@example.com',
  password: '12345678',
  R_num: [0, 1, 2]//標示第1,2,3家餐廳 
}
const User02 = {
  name: 'User02',
  email: 'user2@example.com',
  password: '12345678',
  R_num: [3, 4, 5]//標示第3,4,5家餐廳 
}

const SEED_USER = [User01, User02]
//console.log(SEED_USER)

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')


  Promise.all(Array.from({ length: 2 },
    (_, i) => (

      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash
        }))//建立seedUser基本資料

        .then(user => {
          const userId = user._id
          const RList_withUserId = SEED_USER[i].R_num.map(x => {
            RList[x].userId = userId//新增欄位userId
            return RList[x]
          })//

          return Restaurant.create(RList_withUserId)

        })//把餐廳記到名下
    )//記數內容
  ))//Promise.all end, Array.from end


    .then(() => {
      console.log('done.')
      process.exit()
    })
})