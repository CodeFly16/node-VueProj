const express = require("express")

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser())

app.set('secret', 'asdfcxvsdfads')

//使用json中间件
app.use(express.json())
//解决跨域问题
app.use(require("cors")())

//指明该路由下文件为静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/dbadmin', express.static(__dirname + '/dbadmin'))
app.use('/', express.static(__dirname + '/dbadmin'))


//路由接口
require('./routes/admin/index')(app)
require('./routes/mysqlTest/readerCategory')(app)
require('./routes/mysqlTest/libraryManagement')(app)
require('./routes/mysqlTest/readerManagement')(app)

//mongoDB数据库连接
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log("http://localhost:3000")
})
