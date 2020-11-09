const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  username: {type: String},
  password: {
    type: String,
    select: false,
    set(val) {
      //加密
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
