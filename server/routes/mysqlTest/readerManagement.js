module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  let query = require("../../plugins/mysql")


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  router.get('/testSix/readerManagement', async (req, res) => {
    let sql = "select reader.rdID, reader.rdType,reader.rdName,reader.rdDept,reader.rdQQ,reader.rdBorrowQty , readertype.rdTypeName from reader,readertype where reader.rdType = readertype.rdType"
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

  router.get('/testSix/readerManagement/:id', async (req, res) => {
    const sql = "select reader.rdID, reader.rdType,reader.rdName,reader.rdDept,reader.rdQQ,reader.rdBorrowQty , readertype.rdTypeName from reader,readertype where reader.rdType = readertype.rdType and reader.rdID = ?"
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

  router.post('/testSix/readerManagement', async (req, res) => {
    let sql = "insert into reader(rdType,rdName,rdDept,rdQQ,rdBorrowQty) values(?,?,?,?,?)"
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

  router.delete('/testSix/readerManagement/:id', async (req, res) => {
    const sql = 'delete from reader where rdID = ?'
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

  router.put('/testSix/readerManagement', async (req, res) => {
    const sql = 'update reader set rdType = ?, rdName = ? , rdDept = ?, rdQQ = ?,rdBorrowQty = ? where  rdID = ?'
    console.log(req.body)
    query(sql, [req.body.rdType, req.body.rdName, req.body.rdDept, req.body.rdQQ, req.body.rdBorrowQty, req.body.rdID], (err, result, field) => {
      console.log(err)
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


  app.use("/mysqlTest/api/rest/", authMiddleware(), router)

  //错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      status: err.statusCode || 500,
      message: err.message
    })
  })

}