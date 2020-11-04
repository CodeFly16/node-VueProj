const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  body: {type: String}
})

module.exports = mongoose.model('Article', schema)
