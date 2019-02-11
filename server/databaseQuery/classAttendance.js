const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

exports.selectClassAttendanceInfoSearch = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.CLASS_ATTENDANCE_CODE , DATE_FORMAT( a.CLASS_ATTENDANCE_DATE , \'%Y-%m-%d\' ) AS CLASS_ATTENDANCE_DATE , a.CLASS_ATTENDANCE_TIME,'
  sql += ' a.CLASS_ATTENDANCE_LAT , a.CLASS_ATTENDANCE_LNG , a.CLASS_ATTENDANCE_IMAGE,'
  sql += ' a.CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME , a.STUDENT_NO , c.STUDENT_IMAGE,'
  sql += ' c.STUDENT_CODE_NAME , c.STUDENT_FIRST_NAME , c.STUDENT_LAST_NAME,'
  sql += ' g.USE_STATUS_DESCRIPTION , b.SUBJECT_CODE_NAME , e.TEACHER_FIRST_NAME,'
  sql += ' e.TEACHER_LAST_NAME , f.SEMESTER_NAME , h.SEMESTER_STATUS_DESCRIPTION,'
  sql += ' a.CONFIRM_STATUS_NO , d.CONFIRM_STATUS_DESCRIPTION'
  sql += ' FROM class_attendance_info a , subject_info b ,  student_info c , confirm_status_info d , teacher_info e , semester_info f , use_status_info g , semester_status_info h'
  sql += ' WHERE a.STUDENT_NO = c.STUDENT_NO'
  sql += ' AND a.SUBJECT_NO = b.SUBJECT_NO'
  sql += ' AND a.CONFIRM_STATUS_NO = d.CONFIRM_STATUS_NO'
  sql += ' AND b.TEACHER_NO = e.TEACHER_NO'
  sql += ' AND a.SEMESTER_NO = f.SEMESTER_NO'
  sql += ' AND c.STUDENT_STATUS = g.USE_STATUS_NO'
  sql += ' AND f.SEMESTER_STATUS_NO = h.SEMESTER_STATUS_NO'
  sql += ` AND a.CLASS_ATTENDANCE_CODE LIKE '%${req.body.classAttendanceCode}%'`
  sql += ` AND a.CLASS_ATTENDANCE_DATE BETWEEN '${req.body.startDateSTR}' AND '${req.body.endDateSTR}'`
  sql += ` AND a.STUDENT_NO LIKE '%${req.body.studentNo}%'`
  sql += ` AND a.SUBJECT_NO LIKE '%${req.body.subjectNo}%'`
  sql += ` AND a.CONFIRM_STATUS_NO LIKE '%${req.body.confirmStatusNo}%'`
  sql += ` AND a.SEMESTER_NO LIKE '%${req.body.semesterNo}%'`
  sql += ' ORDER BY a.CLASS_ATTENDANCE_CODE ASC'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}

exports.updateClassAttendanceInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE class_attendance_info'
  sql += ` SET STUDENT_NO = ${req.params.studentNo},`
  sql += ` CONFIRM_STATUS_NO ='${req.params.confirmStatusNo}'`
  sql += ` WHERE CLASS_ATTENDANCE_CODE = '${req.params.classAttendanceCode}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    console.log(res)
    if (rows.affectedRows === 1) {
      console.log('update 1 row complete!')
      res.send('1').status(200)
    } else if (rows.affectedRows === 0) {
      console.log("can't update!")
      res.send('2').status(200)
    }
  })
  mysqlConnection.end()
}

exports.selectClassAttendanceInfoForReport = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.STUDENT_NO  , b.STUDENT_CODE_NAME , b.STUDENT_FIRST_NAME ,'
  sql += ' b.STUDENT_LAST_NAME , a.SUBJECT_NO , COUNT(a.STUDENT_NO) AS SUM_ATTENDANCE'
  sql += ' FROM class_attendance_info a , student_info b'
  sql += ' WHERE a.STUDENT_NO = b.STUDENT_NO'
  sql += ` AND SUBJECT_NO = ${req.body.subjectNo}`
  sql += ` AND SEMESTER_NO = ${req.body.semesterNo}`
  sql += ' AND CONFIRM_STATUS_NO = \'2\''
  sql += ' GROUP BY a.STUDENT_NO'
  sql += ' ORDER BY b.STUDENT_FIRST_NAME ASC , b.STUDENT_LAST_NAME ASC'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    sql = 'SELECT COUNT(STUDENT_NO)'
    sql += ' FROM class_attendance_info'
    sql += ` WHERE SUBJECT_NO = ${req.body.subjectNo}`
    sql += ' AND CONFIRM_STATUS_NO = \'1\''
    sql += ` AND SEMESTER_NO = ${req.body.semesterNo}`

    console.log(sql)
    mysqlConnection.query(sql, (err1, rows1) => {
      if (err1) throw err1
      sql = 'SELECT COUNT(STUDENT_NO)'
      sql += ' FROM class_attendance_info'
      sql += ` WHERE SUBJECT_NO = ${req.body.subjectNo}`
      sql += ' AND CONFIRM_STATUS_NO = \'3\''
      sql += ` AND SEMESTER_NO = ${req.body.semesterNo}`

      console.log(sql)
      mysqlConnection.query(sql, (err2, rows2) => {
        if (err2) throw err2
        const tmp = []
        tmp.push(rows)
        tmp.push(rows1)
        tmp.push(rows2)
        if (rows.length === 0 && rows1[0]['COUNT(STUDENT_NO)'] === 0 && rows2[0]['COUNT(STUDENT_NO)'] === 0) {
          res.send().status(200)
        } else {
          res.send(tmp).status(200)
        }
      })
      mysqlConnection.end()
    })
  })
}
