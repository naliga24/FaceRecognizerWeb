const reportAttendance = require('./../prototype/reportClassAttendance')
const reportTransaction = require('./../prototype/reportUserTransaction')

exports.displayReportClassAttendance = (req, res) => {
  reportAttendance.displayReport(req.body.dataReport, req.body.subjectCodeName, req.body.semesterName, res)
}

exports.displayReportUserTransaction = (req, res) => {
  reportTransaction.displayReport(req.body.dataReport, req.body.startDate, req.body.endDate, req.body.userTypeName, res)
}
