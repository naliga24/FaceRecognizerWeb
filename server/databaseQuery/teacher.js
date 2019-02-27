const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

exports.selectTeacherInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT TEACHER_FIRST_NAME , TEACHER_LAST_NAME , TEACHER_NO'
  sql += ' FROM teacher_info'
  sql += ' WHERE TEACHER_STATUS = \'1\''

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.length > 0) {
      console.log(rows)
      res.send(rows)
    }
  })
  mysqlConnection.end()
}

exports.insertTeacherInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig);
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'INSERT INTO teacher_info (TEACHER_NO , TEACHER_FIRST_NAME , TEACHER_LAST_NAME , TEACHER_STATUS)'
  sql += ' VALUES ('
  sql += ' (SELECT COUNT(TEACHER_NO) + 1 FROM  (SELECT TEACHER_NO FROM teacher_info)AS X),'
  sql += ` '${req.params.teacherFirstName}',`
  sql += ` '${req.params.teacherLastName}',`
  sql += ' \'1\')'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows.affectedRows)
    if (rows.affectedRows === 1) {
      console.log('insert 1 row complete!');
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't insert!")
      res.send('0')
    }
  })
  mysqlConnection.end()
}

exports.updateTeacherInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE teacher_info'
  sql += ` SET TEACHER_FIRST_NAME = '${req.params.teacherFirstName}',`
  sql += ` TEACHER_LAST_NAME = '${req.params.teacherLastName}',`
  sql += ` TEACHER_STATUS = '${req.params.teacherStatus}'`
  sql += ` WHERE TEACHER_NO = ${req.params.teacherNo}`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
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

exports.selectTeacherFirstNameAndLastName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME)'
  sql += ' FROM teacher_info'
  sql += ` WHERE TEACHER_FIRST_NAME = '${req.params.teacherFirstName}'`
  sql += ` AND TEACHER_LAST_NAME = '${req.params.teacherLastName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME) = ${rows[0]['COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME)']}`)
    if (err) throw err
    if (rows[0]['COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME)'] === 0) {
      res.send('0')
    }
    else if (rows[0]['COUNT(TEACHER_FIRST_NAME AND TEACHER_LAST_NAME)'] > 1) {
      res.send('2')
    }
  })
  mysqlConnection.end()
}

exports.selectTeacherInfoSearchTeacher = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.TEACHER_NO , a.TEACHER_FIRST_NAME , a.TEACHER_LAST_NAME , a.TEACHER_CLASS_COUNT , a.TEACHER_STATUS , b.USE_STATUS_DESCRIPTION'
  sql += ' FROM teacher_info a , use_status_info b'
  sql += ' WHERE a.TEACHER_STATUS = b.USE_STATUS_NO'
  sql += ` AND a.TEACHER_FIRST_NAME LIKE '%${req.body.teacherFirstName}%'`
  sql += ` AND a.TEACHER_LAST_NAME LIKE '%${req.body.teacherLastName}%'`
  sql += req.body.teacherClassCount?` AND a.TEACHER_CLASS_COUNT = '${req.body.teacherClassCount}'`:''
  sql += ` AND a.TEACHER_STATUS LIKE '%${req.body.teacherStatus}%'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}

exports.updateTeacherInfoTeacherClassCount = (teacherNo) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE teacher_info'
  sql += ' SET TEACHER_CLASS_COUNT = (SELECT TEACHER_CLASS_COUNT + 1'
  sql += ' FROM (SELECT TEACHER_CLASS_COUNT'
  sql += ' FROM teacher_info'
  sql += ` WHERE TEACHER_NO = ${teacherNo})AS X )`
  sql += ` WHERE TEACHER_NO = ${teacherNo}`
  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.affectedRows === 1) {
      console.log('update 1 row complete!')
    } else if (rows.affectedRows === 0) {
      console.log("can't update!")
    }
  })
  mysqlConnection.end()
}
