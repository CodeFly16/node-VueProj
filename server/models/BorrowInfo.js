const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  rdID: String,//读者序号
  bkID: String,//图书序号
  ldContinueTimes: {type: Number, default: 0},//续借次数
  ldDateOut: Date,//借书日期
  ldDateRetPlan: Date,//应还日期
  ldDateRetAct: Date,//实际还书日期
  ldOverDay: Number,//超期天数
  ldOverMoney: Number,//超期金额（应罚款金额）
  ldPunishMoney: Number,//罚款金额
  lsHasReturn: Boolean,//是否已经还书
  OperatorLend: String,//借书操作员
  OperatorRet: String,//还书操作员
})

module.exports = mongoose.model('BorrowInfo', schema)
