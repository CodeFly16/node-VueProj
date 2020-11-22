const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  rdType: {type: String},//读者类别
  canLendQty: {type: String},//可借书数量
  canlendTime: {type: String}//可借书时间
})

module.exports = mongoose.model('ReaderType', schema)
