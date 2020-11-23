module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')


  //查询功能
  router.get('/:id', authMiddleware(), async (req, res) => {
    console.log(req.Model)
    if (req.Model.modelName === 'ReaderInfo') {
      const model = await req.Model.findOne({rdCard: req.params.id}).limit(10)
      res.send(model)
    }
    if (req.Model.modelName === 'Book') {
      const model = await req.Model.findOne({bkCode: req.params.id}).limit(10)
      res.send(model)
    }
    if (req.Model.modelName === 'ReaderType'){
      const model = await req.Model.findOne({rdType: req.params.id}).limit(10)
      res.send(model)
    }
  })


  app.use("/admin/api/search/:resource", authMiddleware(), resourceMiddleware(), router)


  //错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}