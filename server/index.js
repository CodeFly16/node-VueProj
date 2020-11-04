const express = require("express")

const app = express()

//使用json中间件
app.use(express.json())
//解决跨域问题
app.use(require("cors")())
//指明该路由下文件为静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log("http://localhost:3000")
})
