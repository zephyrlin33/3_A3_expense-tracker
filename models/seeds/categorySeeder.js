const mongoose = require('mongoose')
const Category = require('../category.js')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

const categoryData = [
    { id: 1, name: '家居物業' },
    { id: 2, name: '交通出行' },
    { id: 3, name: '休閒娛樂' },
    { id: 4, name: '餐飲食品' },
    { id: 5, name: '其他' }
]

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    console.log('Creating categories.....')

    Promise.all(Array.from({ length: 5 },
        (_, i) => (
            Category.create(categoryData[i])
                .then(console.log(`category ${categoryData[i].name} is already created.`))
        )
    ))//Promise.all end, Array.from end


        .then(() => {
            console.log('done.')
            process.exit()
        })
})