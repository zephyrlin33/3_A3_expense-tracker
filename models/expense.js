const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  categoryId: { 
    type: Number, 
    ref: 'Category',
    index: true,
    required: true },

  number: { type: Number, required: true },
  
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    //required: true
  }
})

module.exports = mongoose.model("Expense", expenseSchema)