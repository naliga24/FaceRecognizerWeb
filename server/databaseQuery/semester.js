const mysql = require('mysql2')

const { connectConfig } = require('./../configDB')

const updateAllSemesterNoToOldExceptParameter = (semesterNo) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE semester_info'
  sql += ' SET SEMESTER_STATUS_NO = \'2\''
  sql += ` WHERE SEMESTER_NO != ${semesterNo}`

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

const updateAllSemesterNoToOldExceptLast = () => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE semester_info'
  sql += ' SET SEMESTER_STATUS_NO = \'2\''
  sql += ' WHERE SEMESTER_NO != (SELECT COUNT(SEMESTER_NO)'
  sql += ' FROM  (SELECT SEMESTER_NO FROM semester_info)AS X)'

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

exports.selectSemesterInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.SEMESTER_NAME , a.SEMESTER_NO , a.SEMESTER_STATUS_NO , b.SEMESTER_STATUS_DESCRIPTION'
  sql += ' FROM semester_info a , semester_status_info b'
  sql += ' WHERE a.SEMESTER_STATUS_NO = b.SEMESTER_STATUS_NO'
  sql += ' ORDER BY b.SEMESTER_STATUS_DESCRIPTION'

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

exports.selectSemesterInfoSemesterName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(SEMESTER_NAME)'
  sql += ' FROM semester_info'
  sql += ` WHERE SEMESTER_NAME = '${req.body.semesterName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(SEMESTER_NAME) = ${rows[0]['COUNT(SEMESTER_NAME)']}`)
    if (err) throw err
    if (rows[0]['COUNT(SEMESTER_NAME)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(SEMESTER_NAME)'] === 0) {
      res.send('0')
    }else if (rows[0]['COUNT(SEMESTER_NAME)'] > 1) {
      res.send('2')
    }
  })
  mysqlConnection.end()
}

exports.updateSemesterInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE semester_info'
  sql += ` SET SEMESTER_NAME = '${req.body.semesterName}',`
  sql += ` SEMESTER_STATUS_NO = '${req.body.semesterStatusNo}'`
  sql += ` WHERE SEMESTER_NO = '${req.body.semesterNo}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.affectedRows === 1) {
      if (req.body.semesterStatusNo !== req.body.oldSemesterStatusNo) {
        updateAllSemesterNoToOldExceptParameter(req.body.semesterNo)
      }
      console.log('update 1 row complete!')
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't update!")
      res.send('0')
    }
  })
}

exports.insertSemesterInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'INSERT INTO semester_info'
  sql += ' VALUES('
  sql += ' (SELECT COUNT(SEMESTER_NO) + 1 FROM  (SELECT SEMESTER_NO FROM semester_info)AS X),'
  sql += ` '${req.body.semesterName}',`
  sql += ' \'1\')'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    if (rows.affectedRows === 1) {
      console.log('insert 1 row complete!')
      updateAllSemesterNoToOldExceptLast()
      res.send('1')
    } else if (rows.affectedRows === 0) {
      console.log("can't insert!")
      res.send('0')
    }
  })
}

exports.selectSemesterInfoSearchSemester = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.SEMESTER_NO , a.SEMESTER_NAME , a.SEMESTER_STATUS_NO , b.SEMESTER_STATUS_DESCRIPTION'
  sql += ' FROM semester_info a , semester_status_info b'
  sql += ' WHERE a.SEMESTER_STATUS_NO = b.SEMESTER_STATUS_NO'
  sql += ` AND SUBSTRING(SEMESTER_NAME, 1, 1) LIKE '%${req.body.semesterTerm}%'`
  sql += ` AND SUBSTRING(SEMESTER_NAME, 3, 2) LIKE '%${req.body.semesterYear}%'`
  sql += ` AND a.SEMESTER_STATUS_NO LIKE '%${req.body.semesterStatusNo}%'`
  sql += ' ORDER BY a.SEMESTER_STATUS_NO ASC'

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}
