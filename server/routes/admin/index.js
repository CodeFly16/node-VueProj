module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })

  //权限token
  const jwt = require('jsonwebtoken')
  const AdminUser = require("../../models/AdminUser")
  //异常处理包
  const assert = require("http-assert")


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  router.post('/', authMiddleware(), async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', authMiddleware(), async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', authMiddleware(), async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  router.get('/', authMiddleware(), async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.get('/:id', authMiddleware(), async (req, res) => {
    const model = await req.Model.findById(req.params.id).limit(10)
    res.send(model)
  })


  app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router)

  /*
  * 上传图片模块
  * */
  const multer = require('multer')
  const upload = multer({dest: __dirname + '../../../uploads'})
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res, next) => {
    const file = req.file
    file.url = `http://47.98.225.213/uploads/${file.filename}`
    res.send(file)
  })

  /*
  * 登录接口
  * */
  app.post('/admin/api/login', async (req, res) => {
    const {username, password} = req.body
    //根据用户名找用户
    const user = await AdminUser.findOne({username: username}).select('+password')
    assert(user, 422, "用户不存在")
    //校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, "密码错误")
    //返回token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}