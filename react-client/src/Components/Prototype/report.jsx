import subject from './subject'
import semester from './semester'
import classAttendance from './classAttendance'
import login from './login'
import userType from './userType'

const request = require('superagent')

export default class report {
  callListSubject = async () => {
    this.subject = new subject()
    return await this.subject.listSubject()
  }

  callListSemester = async () => {
    this.semester = new semester()
    return await this.semester.listSemester()
  }

  callListPermissionAll = async () => {
    this.userType = new userType()
    return await this.userType.listPermissionAll()
  }

  callListReportAttendance = async (data) => {
    this.classAttendance = new classAttendance()
    return await this.classAttendance.listReportAttendance(data)
  }

  callListReportTransaction = async (data) => {
    this.login = new login()
    return await this.login.listReportTransaction(data)
  }

  displayReportAttendance(dataReport, subjectCodeName, semesterName) {
    return request.post('/displayReportClassAttendance')
      .send({ dataReport, subjectCodeName, semesterName })
      .then((res) => {
        console.log(res.text); return res.text;
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });

  }

  displayReportTransaction(dataReport, startDate, endDate, userTypeName) {
    return request.post('/displayReportUserTransaction')
      .send({ dataReport, startDate, endDate, userTypeName })
      .then((res) => {
        console.log(res.text); return res.text;
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }
}
