'use strict';
var { Storage } = require('@google-cloud/storage');

const { Report } = require('fluentreports');

const dateFormat = require('dateformat')
const displayReport = require('./reportDisplayer')

const { googleCloudConfig } = require('./../configDB')

exports.displayReport = (rows, startDate, endDate, userTypeName, res) => {
  const header = (rpt) => {
    // Date Printed - Top Left
    rpt.fontSize(9);
    rpt.print(dateFormat(new Date(), 'yyyy/mm/dd      HH:MM:ss'), { align: 'right' });

    // Report Title
    rpt.newline()
    rpt.print('  รายงานการเข้าใช้งานระบบ', { fontBold: true, fontSize: 16, align: 'center' });
    rpt.print(`  วันที่ ${startDate} ถึง ${endDate}`, { fontBold: true, fontSize: 16, align: 'center' });
    rpt.print(`  ${userTypeName}`, { fontBold: true, fontSize: 16, align: 'center' });
    rpt.newline();

    // Detail Header
    rpt.newline();
    rpt.newline();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
    rpt.newline();
    rpt.fontBold();
    rpt.band([
      { data: 'วันที่เข้าระบบ', width: 110, align: 'center' },
      { data: 'ใช้ระบบครั้งสุดท้าย', width: 110, align: 'center' },
      { data: 'ชื่ิอผู้ใช้งานระบบ', width: 100, align: 'center' },
      { data: 'ประเภทผู้ใช้งานระบบ', width: 100, align: 'center' },
      { data: 'สถานะการใช้ครั้งสุดท้าย', width: 110, align: 'center' },
    ]);
    rpt.fontNormal();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
  };

  const detail = (rpt, data) => {
    // Detail Body
    rpt.newline();
    rpt.band([
      { data: `${data.LOGIN_DATE},${data.LOGIN_TIME}`, width: 110, align: 'center' },
      { data: `${data.LOGOUT_DATE},${data.LOGOUT_TIME}`, width: 110, align: 'center' },
      { data: data.USER_NAME, width: 100, align: 'center' },
      { data: data.USER_TYPE_NAME, width: 100, align: 'center' },
      { data: data.LOGIN_STATUS_DESCRIPTION, width: 110, align: 'center' },
    ]);
  };

  const finalSummary = function (rpt) {
    rpt.newline();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
    rpt.newline();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
  };

  // Optional -- If you don't pass a report name, it will default to "report.pdf"
  const rptName = 'ReportTransaction.pdf';


  const resultReport = new Report('buffer', { font: 'Garuda' })
  // .pageHeader( [""] )// Optional


  resultReport
    .data(rows)
    .registerFont('Garuda', { normal: './server/prototype/Garuda-Bold.ttf' })
    .fontsize(9)
    .margins(40)
    .detail(detail)
    .groupBy(rows.LOGIN_DATE, Report.show.once)
    .footer(finalSummary)
    .header(header);
  // creates debug output so that you can see how the report is built.
  resultReport.printStructure()
  console.time('Rendered')
  resultReport.render((err, Buffer) => {
    console.timeEnd('Rendered')
    //displayReport(err, name, res);
    var gcs = new Storage({
      projectId: googleCloudConfig['PROJECT_ID'],
      keyFilename: 'My Project 84922-7f660b6844bf.json'
    });

    // Reference an existing bucket.
    var bucket = gcs.bucket(googleCloudConfig['CLOUD_BUCKET_PDF']);
    // var localReadStream = fs.createReadStream('C:\\Users\\nalig\\FaceRecognizerWeb\\server\\1111111111.jpeg');
    var remoteWriteStream = bucket.file(rptName).createWriteStream({
      metadata: {
        contentType: 'application/pdf'
      },
      resumable: false
    })

    // localReadStream.pipe(remoteWriteStream)
    remoteWriteStream.on('error', function (err) { console.log('err', err) })
    remoteWriteStream.on('finish', function () {
      console.log('finish')
    })
    remoteWriteStream.end(Buffer);
    res.status(200).send('Save report complete!')
    //displayReport(err, name, res)
  });
}
