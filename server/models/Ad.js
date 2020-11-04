const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  name: {type: String},
  items: [{
    image: {type: String},
    url: {type: String}
  }]
})

module.exports = mongoose.model('Ad', schema)
