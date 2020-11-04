const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)