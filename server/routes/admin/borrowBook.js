module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })

  const db = require("mongoose");
  const readerInfo = require('../../models/ReaderInfo')
  const book = require('../../models/Book')
  const borrowInfo = require('../../models/BorrowInfo')


  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')


  //借书
  router.post('/borrowBook', authMiddleware(), async (req, res) => {
    console.log(req.body)

    const SESSION = await db.startSession();
    await SESSION.startTransaction();

    try {
      await readerInfo.findOneAndUpdate({rdCard: req.body.rdID}, {$inc: {rdLendCount: +1}})
      await book.findOneAndUpdate({bkCode: req.body.bkID}, {bkStatus: "借出"})
      await borrowInfo.create(req.body)

      await SESSION.commitTransaction();

      res.send({
        status: 200,
        message: '借书成功'
      })

    } catch (error) {
      await SESSION.abortTransaction();
    } finally {
      SESSION.endSession();
    }
  })

  //还书
  router.post('/returnBook', authMiddleware(), async (req, res) => {
    console.log(req.body)

    const SESSION = await db.startSession();
    await SESSION.startTransaction();

    try {
      await readerInfo.findOneAndUpdate({rdCard: req.body.rdID}, {$inc: {rdLendCount: -1}})
      await book.findOneAndUpdate({bkCode: req.body.bkID}, {bkStatus: "在馆"})
      await borrowInfo.findByIdAndUpdate(req.body._id, req.body)

      await SESSION.commitTransaction();

      res.send({
        status: 200,
        message: '还书成功'
      })

    } catch (error) {
      await SESSION.abortTransaction();
    } finally {
      SESSION.endSession();
    }
  })

  //续借
  router.post('/reLendBook', authMiddleware(), async (req, res) => {
    console.log(req.body)

    const SESSION = await db.startSession();
    await SESSION.startTransaction();

    try {
      await borrowInfo.findByIdAndUpdate(req.body._id, req.body)

      await SESSION.commitTransaction();

      res.send({
        status: 200,
        message: '还书成功'
      })

    } catch (error) {
      await SESSION.abortTransaction();
    } finally {
      SESSION.endSession();
    }
  })

  app.use("/admin/api", authMiddleware(), router)


  //错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}