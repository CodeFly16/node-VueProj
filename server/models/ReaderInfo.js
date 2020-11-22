const mongoose = require("mongoose")

//实体类
//定义字段类型
const schema = new mongoose.Schema({
  rdName: {type: String},//姓名
  rdSex: {type: String},//性别
  rdType: {type: String},//读者类别
  rdDept: {type: String},//读者单位
  rdPhone: {type: String},//读者手机号
  rdEmail: {type: String},//读者邮箱
  rdDateReg: {type: String},//读者办证日期
  rdPhoto: {type: String},//读者照片
  rdStatus: {type: String},//证件状态
  rdBorrowQty: {type: String},//读者类别
  rdPwd: {type: String},//读者密码
  rdAdminRoles: {type: String},//读者系统角色
})

module.exports = mongoose.model('ReaderInfo', schema)
