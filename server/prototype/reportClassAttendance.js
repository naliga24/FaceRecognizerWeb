'use strict';
var { Storage } = require('@google-cloud/storage');

const { Report } = require('fluentreports');

const dateFormat = require('dateformat')
const displayReport = require('./reportDisplayer');
const { googleCloudConfig } = require('./../configDB')


exports.displayReport = (reportData, subjectCodeName, semesterName, res) => {
  const header = (rpt) => {
    // Date Printed - Top Left
    rpt.fontSize(9);
    rpt.print(dateFormat(new Date(), 'yyyy/mm/dd      HH:MM:ss'), { align: 'right' });

    // Report Title
    rpt.newline();
    rpt.print('  รายงานการเข้าชั้นเรียน', { fontBold: true, fontSize: 16, align: 'center' });
    rpt.print(`  วิชา ${subjectCodeName}`, { fontBold: true, fontSize: 16, align: 'center' });
    rpt.print(`  ภาคการศึกษา ${semesterName}`, { fontBold: true, fontSize: 16, align: 'center' });
    rpt.newline();

    // Detail Header
    rpt.newline();
    rpt.newline();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
    rpt.newline();
    rpt.fontBold();
    rpt.band([
      { data: 'รหัสนักศึกษา', width: 100, align: 'center' },
      { data: 'ชื่อ/นามสกุล นักศึกษา', width: 200, align: 'center' },
      { data: 'จำนวนครั้งที่เข้าชั้นเรียน', width: 100, align: 'center' },
    ]);
    rpt.fontNormal();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
  };

  const detail = (rpt, data) => {
    // Detail Body
    rpt.newline();
    rpt.band([
      { data: data.STUDENT_CODE_NAME, width: 100, align: 'center' },
      { data: `${data.STUDENT_FIRST_NAME} ${data.STUDENT_LAST_NAME}`, width: 150, align: 'center' },
      { data: data.SUM_ATTENDANCE, width: 100, align: 'center' },
    ]);
  };

  const finalSummary = (rpt) => {
    rpt.newline();
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
    rpt.newline();
    rpt.band([
      { data: 'รอการยืนยันตัวตน', width: 200, align: 'center' },
      { data: 'ไม่สามารถยืนยันตัวตน', width: 200, align: 'center' },
    ]);
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
    rpt.band([
      { data: reportData[1][0]['COUNT(STUDENT_NO)'], width: 200, align: 'center' },
      { data: reportData[2][0]['COUNT(STUDENT_NO)'], width: 200, align: 'center' },
    ]);
    rpt.print('_________________________________________________________________________________________________', { align: 'center' });
  };

  // Optional -- If you don't pass a report name, it will default to "report.pdf"
  const rptName = 'ReportAttendance.pdf';


  const resultReport = new Report('buffer', { font: 'Garuda' })
  // .pageHeader( [""] )// Optional


  resultReport
    .data(reportData[0])
    .registerFont('Garuda', { normal: './server/prototype/Garuda-Bold.ttf' })
    .fontsize(9)
    .margins(40)
    .detail(detail)
    .groupBy(reportData[0].SUBJECT_NO, Report.show.once)
    .footer(finalSummary)
    .header(header);
  // creates debug output so that you can see how the report is built.
  resultReport.printStructure();
  console.time('Rendered');
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
  });
}
