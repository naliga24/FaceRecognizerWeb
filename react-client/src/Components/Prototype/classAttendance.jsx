import semester from './semester'
import subject from './subject'
import student from './student'

const request = require('superagent')

export default class classAttendance {
  updateClassAttendance(studentNo, confirmStatusNo, classAttendanceCode) { //
    return request.get(`/updateClassAttendanceInfo/${studentNo}/${confirmStatusNo}/${classAttendanceCode}`)
      .then((res) => { return res.text })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  listSearchClassAttendance(data) {
    return request.post('/selectClassAttendanceInfoSearch')
      .send({
        classAttendanceCode: data.get('classAttendanceCode'),
        startDateSTR: data.get('startDateSTR'),
        endDateSTR: data.get('endDateSTR'),
        studentNo: data.get('studentNo'),
        subjectNo: data.get('subjectNo'),
        confirmStatusNo: data.get('confirmStatusNo'),
        semesterNo: data.get('semesterNo'),
      })
      .then((res) => {
        console.log(res); return res.body;
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }

  callListSubject = async () => {
    this.subject = new subject()
    return await this.subject.listSubject()
  }

  callListSemester = async () => {
    this.semester = new semester()
    return await this.semester.listSemester()
  }

  callGetStudentNoByStudentCodeName(studentCodeName) {
    this.student = new student()
    this.student.getStudentNoByStudentCodeName(studentCodeName)
  }

  callListSearchStudent = async (data) => {
    this.student = new student()
    return await this.student.listSearchStudent(data)
  }

  callGetStudentNoByClassAttendanceStudentKeyCodeName = async (classAttendanceStudentKeyCodeName) => {
    this.student = new student()
    return await this.student.getStudentNoByClassAttendanceStudentKeyCodeName(classAttendanceStudentKeyCodeName)
  }

  listReportAttendance(data) {
    return request.post('/selectClassAttendanceInfoForReport')
      .send({
        subjectNo: data.subjectNo, semesterNo: data.semesterNo,
      })
      .then((res) => {
        if (res.body) { console.log(res); return res.body; }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

}
