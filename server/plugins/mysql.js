const mysql = require('mysql')
const mysqlConf = require('../conf/mysqlConf')
let pool = mysql.createPool(mysqlConf)
/*connection.connect(err => {
  if (err) {
    console.log('连接失败' + err.stack);
    return;
  }
  console.log("连接成功" + connection.threadId);
});*/

let query = function (sql, params, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err)
      callback(err, null, null);
    } else {
      conn.query(sql, params, (err, result, fields) => {
        //事件驱动回调
        callback(err, result, fields);
      });
      //释放连接
      conn.release();
    }
  });
};


module.exports = query


