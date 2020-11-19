module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  let query = require("../../plugins/mysql")


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  router.get('/testSix/readerCategory', async (req, res) => {
    let sql = "select * from readertype"
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

  router.post('/testSix/readerCategory', async (req, res) => {
    let sql = "insert into readertype(rdTypeName,canLendQty,canLendDay) values(?,?,?)"
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


  router.delete('/testSix/readerCategory/:id', async (req, res) => {
    const sql = 'delete from readertype where rdType = ?'
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

  router.get('/testSix/readerCategory/:id', async (req, res) => {
    const sql = "select * from readertype where rdType = ?"
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

  router.put('/testSix/readerCategory/:id', async (req, res) => {
    const sql = 'update readertype set rdTypeName = ?, canLendQty = ? , canLendDay = ? where rdType = ?'
    query(sql, [req.body.rdTypeName, req.body.canLendQty, req.body.canLendDay, req.body.rdType], (err, result, field) => {
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