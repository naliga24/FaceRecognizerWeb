const jwt = require('jsonwebtoken')
const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

exports.selectUserPermission = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.USER_NO , a.USER_NAME , b.USER_TYPE_PERMISSION'
  sql += ' FROM user_info a , user_type_info b'
  sql += ' WHERE a.USER_TYPE = b.USER_TYPE_NO'
  sql += ` AND a.USER_LOGIN = '${req.body.userLogin}'`
  sql += ` AND a.USER_PASSWORD = '${req.body.userPassword}'`
  sql += ' AND a.USER_STATUS = \'1\''
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length === 1) {
      const data = JSON.parse(JSON.stringify(rows))
      const token = jwt.sign(data[0], 'shhhhh')
      res.send({ token })
      console.log(rows)
    } else {
      res.send({ token: 'LoginFail' })
    }
  })
  mysqlConnection.end()
}
exports.insertUserInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig);
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(*) FROM user_info'
  sql += ` WHERE USER_LOGIN = "${req.body.data.userLogin}"`
  sql += ` AND USER_PASSWORD = "${req.body.data.userPassword}"`
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows[0]['COUNT(*)'] === 0) {
      sql = 'INSERT INTO user_info ( USER_NO , USER_LOGIN , USER_PASSWORD , USER_NAME , USER_TYPE , USER_STATUS )'
      sql += ' SELECT COUNT(*) + 1 ,'
      sql += ` '${req.body.data.userLogin}',`
      sql += ` '${req.body.data.userPassword}',`
      sql += ` '${req.body.data.userName}',`
      sql += ` '${req.body.data.userType}',`
      sql += ` '${req.body.data.userStatus}'`
      sql += ' FROM user_info'
      console.log(sql)
      console.log(req.body)
      mysqlConnection.query(sql, (err1, rows1) => {
        if (err1) throw err1
        console.log(rows1.affectedRows)
        if (rows1.affectedRows === 1) {
          console.log('insert 1 row complete!');
          res.send('1')
        } else if (rows1.affectedRows === 0) {
          console.log("can't insert!")
          res.send('2')
        }
      })
      mysqlConnection.end()
    } else {
      res.send('0')
    }
  })
}
exports.updateUserInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  let sql = 'UPDATE user_info'
  sql += ` SET USER_LOGIN = '${req.body.data.userLogin}',`
  sql += ` USER_PASSWORD = '${req.body.data.userPassword}',`
  sql += ` USER_NAME = '${req.body.data.userName}',`
  sql += ` USER_TYPE = '${req.body.data.userType}',`
  sql += ` USER_STATUS = '${req.body.data.userStatus}'`
  sql += ` WHERE USER_NO = ${req.body.data.userNo};`
  sql += req.body.data.userStatus === '2' ? `INSERT INTO user_inactive_info ( USER_NO , SUBSTRING(DATE_ADD(NOW(), INTERVAL 7 HOUR), 1,10) , ADDTIME(CURRENT_TIME(), '07:00:00') , INACTIVE_DETAIL ) 
      VALUES ( ${req.body.data.userNo}, '${req.body.data.inactiveDate}' , '${req.body.data.inactiveTime}' , '${req.body.data.inactiveDetail}')` : ''
  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (req.body.data.userStatus === 1) {
      if (rows.affectedRows === 1) {
        console.log('update 1 row complete!')
        res.send('1')
      } else if (rows.affectedRows === 0) {
        console.log("can't update!")
        res.send('0')
      }
    } else if (req.body.data.userStatus === 2) {
      console.log(rows[0])
      console.log(rows[1])
      if (rows[0].affectedRows === 1 && rows[1].affectedRows === 1) {
        console.log('update 1 row complete!')
        res.send('1')
      } else if (rows[0].affectedRows === 0 && rows[1].affectedRows === 0) {
        console.log("can't update!")
        res.send('0')
      } else if ((rows[0].affectedRows === 0 || rows[1].affectedRows === 0)) {
        console.log('err!')
        res.send('2')
      }
    }
  })
  mysqlConnection.end()
}
exports.selectUserInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  let sql = 'SELECT a.USER_NO , a.USER_LOGIN , a.USER_PASSWORD , a.USER_NAME , a.USER_TYPE , a.USER_STATUS,'
  sql += ' b.USER_TYPE_NAME , c.USE_STATUS_DESCRIPTION'
  sql += ' FROM user_info a, user_type_info b, use_status_info c'
  sql += ' WHERE a.USER_TYPE = b.USER_TYPE_NO'
  sql += ' AND a.USER_STATUS = c.USE_STATUS_NO'
  sql += ` AND a.USER_LOGIN LIKE '%${req.body.data.userLogin}%'`
  sql += ` AND a.USER_NAME LIKE '%${req.body.data.userName}%'`
  sql += ' ORDER BY a.USER_LOGIN'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows)
    res.send(rows)
  })
  mysqlConnection.end()
}
exports.selectUserInactiveInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig);
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  let sql = 'SELECT DATE_FORMAT(INACTIVE_DATE , \'%Y-%m-%d\') AS INACTIVE_DATE , INACTIVE_TIME , INACTIVE_DETAIL'
  sql += ' FROM user_inactive_info'
  sql += ` WHERE USER_NO = ${req.params.userNo}`
  sql += ' ORDER BY INACTIVE_DATE DESC , INACTIVE_TIME DESC LIMIT 1'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length > 0) {
      res.send(rows)
      console.log(req.body)
      console.log(rows)
    } else {
      console.log(req.body)
    }
  })
  mysqlConnection.end()
}
exports.insertUserTransaction = (req, res) => {
  console.log(req.params)
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  let sql = 'INSERT INTO user_transaction (LOGIN_NO, LOGIN_DATE , LOGIN_TIME , LOGIN_STATUS)'
  sql += ' VALUES ('
  sql += ` ${req.params.loginNo},`
  sql += ' SUBSTRING(DATE_ADD(NOW(), INTERVAL 7 HOUR), 1,10),'
  sql += ` ADDTIME(CURRENT_TIME(), '07:00:00'),`
  sql += ` '${req.params.loginStatus}')`
  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows)
    if (rows.affectedRows === 1) {
      console.log('insert 1 row complete!')
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't insert!")
      res.send('0')
    }
  })
  mysqlConnection.end()
}

exports.updateUserTransaction = (req, res) => {
  console.log(req.params)
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  let sql = 'UPDATE user_transaction'
  sql += ` SET LOGIN_STATUS = '${req.params.loginStatus}',`
  sql += ' LOGOUT_DATE = SUBSTRING(DATE_ADD(NOW(), INTERVAL 7 HOUR), 1,10),'
  sql += ` LOGOUT_TIME = ADDTIME(CURRENT_TIME(), '07:00:00')`
  sql += ` WHERE LOGIN_NO = ${req.params.loginNo}`
  sql += ' AND LOGIN_DATE = (SELECT MAX(LOGIN_DATE)'
  sql += ' FROM (SELECT LOGIN_DATE FROM user_transaction)AS X'
  sql += ` WHERE LOGIN_NO = ${req.params.loginNo} )`
  sql += ' AND LOGIN_TIME = (SELECT MAX(LOGIN_TIME)'
  sql += ' FROM (SELECT LOGIN_TIME , LOGIN_NO , LOGIN_DATE FROM user_transaction )AS X'
  sql += ` WHERE LOGIN_NO = ${req.params.loginNo}`
  sql += ' AND LOGIN_DATE = (SELECT MAX(LOGIN_DATE)'
  sql += ' FROM (SELECT LOGIN_DATE FROM user_transaction)AS X))'

  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows)
    console.log(sql)
    if (rows.affectedRows === 1) {
      console.log('update 1 row complete!')
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't update!")
      res.send('0')
    }
  })
  mysqlConnection.end()
}
exports.selectUserInfoUserLogin = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(USER_LOGIN)'
  sql += ' FROM user_info'
  sql += ` WHERE USER_LOGIN = '${req.body.userLogin}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(USER_LOGIN) = ${rows[0]['COUNT(USER_LOGIN)']}`)
    if (err) throw err
    if (rows[0]['COUNT(USER_LOGIN)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(USER_LOGIN)'] === 0) {
      res.send('0')
    }
  })
  mysqlConnection.end()
}
exports.selectUserInfoUserPassword = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(USER_PASSWORD)'
  sql += ' FROM user_info'
  sql += ` WHERE USER_PASSWORD = '${req.body.userPassword}'`
  sql += ` AND USER_LOGIN = '${req.body.userLogin}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(USER_PASSWORD) = ${rows[0]['COUNT(USER_PASSWORD)']}`)
    if (err) throw err
    if (rows[0]['COUNT(USER_PASSWORD)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(USER_PASSWORD)'] === 0) {
      res.send('0')
    }
  })
  mysqlConnection.end()
}

exports.selectUserInfoUserStatus = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(USER_STATUS)'
  sql += ' FROM user_info'
  sql += ` WHERE USER_LOGIN = '${req.body.userLogin}'`
  sql += ` AND USER_PASSWORD = '${req.body.userPassword}'`
  sql += ' AND USER_STATUS = \'1\''

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(USER_STATUS) = ${rows[0]['COUNT(USER_STATUS)']}`)
    if (err) throw err
    if (rows[0]['COUNT(USER_STATUS)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(USER_STATUS)'] === 0) {
      res.send('0')
    }
  })
  mysqlConnection.end()
}

exports.selectUserInfoUserLoginValue = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT USER_NO'
  sql += ' FROM user_info'
  sql += ` WHERE USER_LOGIN = '${req.body.userLogin}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows)
    if (rows.length === 1) {
      res.send(rows)
    }
  })
  mysqlConnection.end()
}
