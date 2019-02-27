const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')
const teacher = require('./teacher')

exports.insertSubjectInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig);
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'INSERT INTO subject_info (SUBJECT_NO , SUBJECT_CODE_NAME , SUBJECT_NAME , SUBJECT_DESCRIPTION , TEACHER_NO , SUBJECT_STATUS)'
  sql += ' VALUES ('
  sql += ' (SELECT COUNT(SUBJECT_NO) + 1 FROM (SELECT SUBJECT_NO FROM subject_info)AS x),'
  sql += ` '${req.params.subjectCodeName}',`
  sql += ` '${req.params.subjectName}',`
  sql += ` '${req.params.subjectDescription}',`
  sql += ` ${req.params.teacherNo},`
  sql += ' \'1\')'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(rows.affectedRows)
    if (rows.affectedRows === 1) {
      console.log('insert 1 row complete!')
      teacher.updateTeacherInfoTeacherClassCount(req.params.teacherNo)
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't insert!")
      res.send('0')
    }
  })
  mysqlConnection.end()
}
exports.updateSubjectInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE subject_info'
  sql += ` SET SUBJECT_CODE_NAME = '${req.params.subjectCodeName}',`
  sql += ` SUBJECT_NAME = '${req.params.subjectName}',`
  sql += ` SUBJECT_DESCRIPTION = '${req.params.subjectDescription}',`
  sql += ` TEACHER_NO = '${req.params.teacherNo}',`
  sql += ` SUBJECT_STATUS = '${req.params.subjectStatus}'`
  sql += ` WHERE SUBJECT_NO = '${req.params.subjectNo}'`

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


exports.selectSubjectInfoSearchSubject = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.SUBJECT_NO , a.SUBJECT_CODE_NAME , a.SUBJECT_NAME , a.SUBJECT_DESCRIPTION , a.TEACHER_NO , a.SUBJECT_STATUS , b.TEACHER_FIRST_NAME ,  b.TEACHER_LAST_NAME , c.USE_STATUS_DESCRIPTION'
  sql += ' FROM subject_info a , teacher_info b , use_status_info c'
  sql += ' WHERE a.TEACHER_NO = b.TEACHER_NO'
  sql += ' AND a.SUBJECT_STATUS = c.USE_STATUS_NO'
  sql += ` AND a.SUBJECT_CODE_NAME LIKE '%${req.body.subjectCodeName}%'`
  sql += ` AND a.SUBJECT_NAME LIKE '%${req.body.subjectName}%'`
  sql += ` AND b.TEACHER_FIRST_NAME LIKE '%${req.body.teacherFirstName}%'`
  sql += ` AND b.TEACHER_LAST_NAME LIKE '%${req.body.teacherLastName}%'`
  sql += ` AND a.SUBJECT_STATUS LIKE '%${req.body.subjectStatus}%'`
  sql += ' ORDER BY a.SUBJECT_CODE_NAME'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}

exports.selectSubjectInfoSubjectCodeName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(SUBJECT_CODE_NAME)'
  sql += ' FROM subject_info'
  sql += ` WHERE SUBJECT_CODE_NAME = '${req.params.subjectCodeName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(SUBJECT_CODE_NAME) = ${rows[0]['COUNT(SUBJECT_CODE_NAME)']}`)
    if (err) throw err
    if (rows[0]['COUNT(SUBJECT_CODE_NAME)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(SUBJECT_CODE_NAME)'] === 0) {
      res.send('0')
    }
    else if (rows[0]['COUNT(SUBJECT_CODE_NAME)'] > 1) {
      res.send('2')
    }
  })
  mysqlConnection.end()
}

exports.selectSubjectInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT SUBJECT_CODE_NAME , SUBJECT_NO'
  sql += ' FROM subject_info'
  sql += ' ORDER BY SUBJECT_CODE_NAME'

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
