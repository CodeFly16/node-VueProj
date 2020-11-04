const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  name: {type: String},
  icon: {type: String}
})

module.exports = mongoose.model('Item', schema)