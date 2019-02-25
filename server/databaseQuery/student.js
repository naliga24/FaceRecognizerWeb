'use strict';
const fs = require('fs')
const mysql = require('mysql2')
var { Storage } = require('@google-cloud/storage');

const { connectConfig , googleCloudConfig } = require('./../configDB')


exports.selectStudentInfoStudentCodeName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT COUNT(STUDENT_CODE_NAME)'
  sql += ' FROM student_info'
  sql += ` WHERE STUDENT_CODE_NAME = '${req.params.studentCodeName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    console.log(`COUNT(STUDENT_CODE_NAME) = ${rows[0]['COUNT(STUDENT_CODE_NAME)']}`)
    if (err) throw err
    if (rows[0]['COUNT(STUDENT_CODE_NAME)'] === 1) {
      res.send('1')
    } else if (rows[0]['COUNT(STUDENT_CODE_NAME)'] === 0) {
      res.send('0')
    }
  })
  mysqlConnection.end()
}

exports.updateStudentInfo = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  if (!req.files) { return res.status(400).send('No image files were uploaded.') }
  if (req.files.studentImage.mimetype === 'image/jpeg' || req.files.studentImage.mimetype === 'image/png' || req.files.studentImage.mimetype === 'image/gif') {
      var gcs = new Storage({
        projectId: googleCloudConfig['PROJECT_ID'],
        keyFilename: 'my-project-1528106461323-04e18a9b4635.json'
      });
  
      // Reference an existing bucket.
      var bucket = gcs.bucket(googleCloudConfig['CLOUD_BUCKET_IMG']);
      // var localReadStream = fs.createReadStream('C:\\Users\\nalig\\FaceRecognizerWeb\\server\\1111111111.jpeg');
      var remoteWriteStream = bucket.file(req.files.studentImage.name).createWriteStream({
        metadata: {
          contentType: req.files.studentImage.mimetype
        },
        resumable: false
      })
  
      // localReadStream.pipe(remoteWriteStream)
      remoteWriteStream.on('error', function (err) { console.log('err', err) })
      remoteWriteStream.on('finish', function () {
        console.log('finish')
        let sql = 'UPDATE student_info'
        sql += ` SET STUDENT_CODE_NAME = '${req.query.studentCodeName}',`
        sql += ` STUDENT_FIRST_NAME = '${req.query.studentFirstName}',`
        sql += ` STUDENT_LAST_NAME = '${req.query.studentLastName}',`
        sql += ` STUDENT_STATUS = '${req.query.studentStatus}',`
        sql += ` STUDENT_IMAGE = \'${getPublicUrl(req.files.studentImage.name)}\'`
        sql += ` WHERE STUDENT_NO = ${req.query.studentNo}`
  
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

      })
      remoteWriteStream.end(req.files.studentImage.data);

  } else {
    console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'")
  }
}

exports.updateStudentInfoNoImg = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'UPDATE student_info'
  sql += ` SET STUDENT_CODE_NAME = '${req.query.studentCodeName}',`
  sql += ` STUDENT_FIRST_NAME = '${req.query.studentFirstName}',`
  sql += ` STUDENT_LAST_NAME = '${req.query.studentLastName}',`
  sql += ` STUDENT_STATUS = '${req.query.studentStatus}'`
  sql += ` WHERE STUDENT_NO = ${req.query.studentNo}`

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


exports.insertStudentInfo = (req, res, next) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  })
  console.log('req.files', req.files)
  if (!req.files) { return res.status(400).send('No image files were uploaded.'); }
  if (req.files.studentImage.mimetype === 'image/jpeg' || req.files.studentImage.mimetype === 'image/png' || req.files.studentImage.mimetype === 'image/gif') {
    var gcs = new Storage({
      projectId: googleCloudConfig['PROJECT_ID'],
      keyFilename: 'my-project-1528106461323-04e18a9b4635.json'
    });

    // Create a new bucket.
    gcs.createBucket(googleCloudConfig['CLOUD_BUCKET_IMG'], function (err, bucket) {
      if (!err) {
        // "my-new-bucket" was successfully created.
        console.log(`"${googleCloudConfig['CLOUD_BUCKET_IMG']}" was successfully created.`)
      }
    });

    // Reference an existing bucket.
    var bucket = gcs.bucket(googleCloudConfig['CLOUD_BUCKET_IMG']);
    // var localReadStream = fs.createReadStream('C:\\Users\\nalig\\FaceRecognizerWeb\\server\\1111111111.jpeg');
    var remoteWriteStream = bucket.file(req.files.studentImage.name).createWriteStream({
      metadata: {
        contentType: req.files.studentImage.mimetype
      },
      resumable: false
    })

    // localReadStream.pipe(remoteWriteStream)
    remoteWriteStream.on('error', function (err) { console.log('err', err) })
    remoteWriteStream.on('finish', function () {
      console.log('finish')
          let sql = 'INSERT INTO student_info (STUDENT_NO , STUDENT_CODE_NAME , STUDENT_FIRST_NAME , STUDENT_LAST_NAME , STUDENT_STATUS , STUDENT_IMAGE)'
          sql += ' VALUES('
          sql += ' (SELECT COUNT(STUDENT_NO) + 1 FROM  (SELECT STUDENT_NO FROM student_info)AS X),'
          sql += ` '${req.query.studentCodeName}',`
          sql += ` '${req.query.studentFirstName}',`
          sql += ` '${req.query.studentLastName}',`
          sql += ' \'1\','
          sql += `\'${getPublicUrl(req.files.studentImage.name)}\')`
    
          console.log(sql)
          mysqlConnection.query(sql, (err, rows) => {
            if (err) throw err
            if (rows.affectedRows === 1) {
              console.log('insert 1 row complete!')
              res.send('1')
            } else if (rows.affectedRows === 0) {
              console.log("can't insert!")
              res.send('0')
            }
          })
          mysqlConnection.end()
 
    })
    remoteWriteStream.end(req.files.studentImage.data);

  } else {
    console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'")
  }
}

function getPublicUrl (filename) {
  return `https://storage.cloud.google.com/${googleCloudConfig['CLOUD_BUCKET_IMG']}/${filename}`;
}

exports.selectStudentInfoSearchStudent = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT a.STUDENT_NO , a.STUDENT_CODE_NAME , a.STUDENT_FIRST_NAME , a.STUDENT_LAST_NAME , a.STUDENT_STATUS , a.STUDENT_IMAGE , b.USE_STATUS_DESCRIPTION'
  sql += ' FROM student_info a , use_status_info b'
  sql += ' WHERE a.STUDENT_STATUS = b.USE_STATUS_NO'
  sql += ` AND a.STUDENT_CODE_NAME LIKE '%${req.body.studentCodeName}%'`
  sql += ` AND a.STUDENT_FIRST_NAME LIKE '%${req.body.studentFirstName}%'`
  sql += ` AND a.STUDENT_LAST_NAME LIKE '%${req.body.studentLastName}%'`
  sql += ` AND a.STUDENT_STATUS LIKE '%${req.body.studentStatus}%'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}

exports.selectStudentNoByStudentCodeName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT STUDENT_NO'
  sql += ' FROM student_info'
  sql += ` WHERE STUDENT_CODE_NAME = '${req.body.studentCodeName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}

exports.selectStudenNoByClassAttendanceStudentKeyCodeName = (req, res) => {
  const mysqlConnection = mysql.createConnection(connectConfig)
  mysqlConnection.connect((err) => {
    if (err) throw err
  });
  let sql = 'SELECT STUDENT_NO'
  sql += ' FROM student_info'
  sql += ` WHERE STUDENT_CODE_NAME = '${req.params.classAttendanceStudentKeyCodeName}'`

  console.log(sql)
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
  mysqlConnection.end()
}
