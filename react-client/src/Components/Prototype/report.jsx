import subject from './subject'
import semester from './semester'
import classAttendance from './classAttendance'
import login from './login'
import userType from './userType'

const request = require('superagent')

export default class report {
  callListSubject=async()=> {
    this.subject = new subject()
    return await this.subject.listSubject()
  }

  callListSemester=async()=> {
    this.semester = new semester()
    return await this.semester.listSemester()
  }

  callListPermissionAll=async()=> {
    this.userType = new userType()
    return await this.userType.listPermissionAll()
  }

  callListReportAttendance=async(data)=> {
    this.classAttendance = new classAttendance()
    return await this.classAttendance.listReportAttendance(data)
  }

  callListReportTransaction=async(data)=> {
    this.login = new login()
    return await this.login.listReportTransaction(data)
  }

  displayReportAttendance(dataReport, subjectCodeName, semesterName) {
    request.post('/displayReportClassAttendance')
      .send({ dataReport, subjectCodeName, semesterName })
      .end((err, res) => {
        if (err) { console.log(err);  }
      })
  }

  displayReportTransaction(dataReport, startDate, endDate, userTypeName) {
    request.post('/displayReportUserTransaction')
      .send({dataReport, startDate, endDate, userTypeName })
      .end((err, res) => {
        if (err) { console.log(err);  }
      })
  }
}
