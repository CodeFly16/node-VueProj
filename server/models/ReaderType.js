const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  rdType: {type: String},//读者类别
  canLendQty: {type: Number},//可借书数量
  canLendDay: {type: Number},//可借书天数
  cardValidYear: {type: Number},//借书证有效期
  relendNum: {type: Number},//可续借次数

})

module.exports = mongoose.model('ReaderType', schema)
