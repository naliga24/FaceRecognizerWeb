import subject from './subject'
import semester from './semester'
import classAttendance from './classAttendance'
import login from './login'
import userType from './userType'

const request = require('superagent')

export default class report {
  callListSubject() {
    this.subject = new subject()
    this.subject.listSubject()
  }

  callListSemester() {
    this.semester = new semester()
    this.semester.listSemester()
  }

  callListPermissionAll() {
    this.userType = new userType()
    this.userType.listPermissionAll()
  }

  callListReportAttendance(data) {
    this.classAttendance = new classAttendance()
    this.classAttendance.listReportAttendance(data)
  }

  callListReportTransaction(data) {
    this.login = new login()
    this.login.listReportTransaction(data)
  }

  displayReportAttendance(dataReport, subjectCodeName, semesterName) {
    request.post('http://localhost:9000/displayReportClassAttendance')
      .send({ dataReport, subjectCodeName, semesterName })
      .end((err, res) => {
        if (err) { console.log(err);  }
      })
  }

  displayReportTransaction(dataReport, startDate, endDate, userTypeName) {
    request.post('http://localhost:9000/displayReportUserTransaction')
      .send({dataReport, startDate, endDate, userTypeName })
      .end((err, res) => {
        if (err) { console.log(err);  }
      })
  }
}
