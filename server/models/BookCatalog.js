const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  cateNumber: {type: String},   //分类号
  cateName: {type: String}      //分类名
})

module.exports = mongoose.model('BookCatalog', schema)
