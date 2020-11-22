const mongoose = require("mongoose")


//实体类
//定义字段类型
const schema = new mongoose.Schema({
  bkCode: {type: String},//图书编号
  bkName: {type: String},//书名
  bkAuthor: {type: String},//作者
  bkPress: {type: String},//出版社
  bkDatePress: {type: Date},//出版日期
  bkISBN: {type: String},//ISBN书号
  bkCatalog: {type: String},//分类号
  bkLanguage: {type: Number},//语言
  bkPages: {type: Number},//页数
  bkPrice: {type: Number},//价格
  bkDateIn: {type: Date, default: Date.now},//入馆时间
  bkBrief: {type: String},//简介
  bkCover: {type: String},//图片封面照片
  bkStatus: {type: String},//图书状态
})

module.exports = mongoose.model('Book', schema)
