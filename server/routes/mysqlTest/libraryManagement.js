module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  let query = require("../../plugins/mysql")


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  router.get('/testSix/libraryManagement', async (req, res) => {
    let sql = "select * from book"
    query(sql, (err, result, field) => {
      if (err) {
        res.json({
          status: 500,
          msg: err,
        });
        return;
      }
      res.json({
        status: 200,
        msg: 'success',
        data: result
      });
    })
  })

  router.post('/testSix/libraryManagement', async (req, res) => {
    let sql = "insert into book(bkName,bkAuthor,bkPress,bkPrice,bkStatus) values(?,?,?,?,?)"
    query(sql, Object.values(req.body), (err, result, field) => {
      if (err) {
        res.json({
          status: 500,
          msg: err,
        });
        return;
      }
      res.json({
        status: 200,
        msg: 'success',
        data: result
      });
    })
  })

  router.delete('/testSix/libraryManagement/:id', async (req, res) => {
    const sql = 'delete from book where bkID = ?'
    query(sql, [req.params.id], (err, result, field) => {
      if (err) {
        res.json({
          status: 500,
          msg: err,
        });
        return;
      }
      res.json({
        status: 200,
        msg: 'success',
        data: result
      });
    })
  })

  router.get('/testSix/libraryManagement/:id', async (req, res) => {
    const sql = "select * from book where bkID = ?"
    query(sql, [req.params.id], (err, result, field) => {
      if (err) {
        res.json({
          status: 500,
          msg: err,
        });
        return;
      }
      res.json({
        status: 200,
        msg: 'success',
        data: result
      });
    })
  })

  router.put('/testSix/libraryManagement/:id', async (req, res) => {
    const sql = 'update book set bkName = ?, bkAuthor = ? , bkPress = ?, bkPrice = ?,bkStatus = ? where bkID = ?'
    query(sql, [req.body.bkName, req.body.bkAuthor, req.body.bkPress, req.body.bkPrice, req.body.bkStatus, req.params.id], (err, result, field) => {
      console.log(err)
      console.log(req.body)
      console.log(req.params)
      if (err) {
        res.json({
          status: 500,
          msg: err,
        });
        return;
      }
      res.json({
        status: 200,
        msg: 'success',
        data: result
      });
    })
  })

  app.use("/mysqlTest/api/rest/", router)

  //错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      status: err.statusCode || 500,
      message: err.message
    })
  })

}