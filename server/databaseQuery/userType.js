const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

exports.updateUserTypeInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(*) FROM user_type_info'
  sql += ` WHERE USER_TYPE_NO = '${req.params.userTypeNo}'`
  sql += ' AND USER_TYPE_NO > \'0\''
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows[0]['COUNT(*)'] === 1) {
      sql = 'UPDATE user_type_info'
      sql += ` SET USER_TYPE_PERMISSION = '${req.params.userTypePermission}'`
      sql += ` WHERE USER_TYPE_NO = '${req.params.userTypeNo}'`
      mysqlConnection.query(sql, (err1, rows1) => {
        if (err1) throw err1
        if (rows1.affectedRows === 1) {
          console.log('update 1 row complete!')
          res.send('1')
        } else if (rows1.affectedRows === 0) {
          console.log('can\'t update!')
          res.send('0')
        }
      })
      mysqlConnection.end()
    }
  })
}
exports.selectUserTypeInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT * FROM user_type_info'
  sql += ' WHERE USER_TYPE_NO > \'0\''
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length > 0) {
      res.send(rows)
    }
  })
  mysqlConnection.end()
}

exports.selectUserTypeInfoAll = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  const sql = 'SELECT * FROM user_type_info'
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length > 0) {
      res.send(rows)
    }
  })
  mysqlConnection.end()
}
