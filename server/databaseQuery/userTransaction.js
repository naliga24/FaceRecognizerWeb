const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

exports.selectUserTransactionForReport = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT DATE_FORMAT( a.LOGIN_DATE , \'%Y-%m-%d\' )AS LOGIN_DATE , a.LOGIN_TIME , DATE_FORMAT( a.LOGOUT_DATE , \'%Y-%m-%d\' )AS LOGOUT_DATE , a.LOGOUT_TIME ,'
  sql += ' b.USER_NAME , c.USER_TYPE_NAME , d.LOGIN_STATUS_DESCRIPTION'
  sql += ' FROM user_transaction a , user_info b , user_type_info c , login_status_info d'
  sql += ' WHERE a.LOGIN_NO = b.USER_NO'
  sql += ' AND b.USER_TYPE = c.USER_TYPE_NO'
  sql += ' AND a.LOGIN_STATUS = d.LOGIN_STATUS_NO'
  sql += ` AND (a.LOGIN_DATE BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`
  sql += ` OR a.LOGOUT_DATE BETWEEN '${req.body.startDate}' AND '${req.body.endDate}')`
  sql += ` AND c.USER_TYPE_NO LIKE '%${req.body.userTypeNo}%'`
  sql += ` ORDER BY LOGIN_DATE ASC , a.LOGIN_TIME ASC`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length > 0) {
      res.send(rows).status(200)
    } else {
      res.send().status(200)
    }
  })
  mysqlConnection.end()
}
