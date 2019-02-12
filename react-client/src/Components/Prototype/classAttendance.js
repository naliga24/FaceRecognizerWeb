import semester from './semester'
import subject from './subject'
import student from './student'

const request = require('superagent')

export default class classAttendance {
  updateClassAttendance(studentNo, confirmStatusNo, classAttendanceCode) {
    request.get(`https://facerecognizerweb.herokuapp.com/updateClassAttendanceInfo/${studentNo}/${confirmStatusNo}/${classAttendanceCode}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.updateClassAttendanceFlag = res.text
      })
  }

  listSearchClassAttendance(data) {
    request.post('https://facerecognizerweb.herokuapp.com/selectClassAttendanceInfoSearch')
      .send({
        classAttendanceCode: data.get('classAttendanceCode'),
        startDateSTR: data.get('startDateSTR'),
        endDateSTR: data.get('endDateSTR'),
        studentNo: data.get('studentNo'),
        subjectNo: data.get('subjectNo'),
        confirmStatusNo: data.get('confirmStatusNo'),
        semesterNo: data.get('semesterNo'),
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.returnListSearchClassAttendance = res.body
      })
  }

  callListSubject() {
    this.subject = new subject()
    this.subject.listSubject()
  }

  callListSemester() {
    this.semester = new semester()
    this.semester.listSemester()
  }

  callGetStudentNoByStudentCodeName(studentCodeName) {
    this.student = new student()
    this.student.getStudentNoByStudentCodeName(studentCodeName)
  }

  callListSearchStudent(data) {
    this.student = new student()
    this.student.listSearchStudent(data)
  }

  callGetStudentNoByClassAttendanceStudentKeyCodeName(classAttendanceStudentKeyCodeName) {
    this.student = new student()
    this.student.getStudentNoByClassAttendanceStudentKeyCodeName(classAttendanceStudentKeyCodeName)
  }

  listReportAttendance(data) {
    request.post('https://facerecognizerweb.herokuapp.com/selectClassAttendanceInfoForReport')
      .send({
        subjectNo: data.subjectNo, semesterNo: data.semesterNo,
      })
      .end((err, res) => {
        if (err) { return; }
        if (res.body) {
          this.dataReport = res.body
        }
      })
  }
}
