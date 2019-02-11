import teacher from './teacher.js'
import semester from './semester.js'

const request = require('superagent')

export default class subject {
  callListTeacher() {
    this.teacher = new teacher()
    this.teacher.listTeacher()
  }

  addSubject(subjectCodeName, subjectName, subjectDescription, teacherNo, clear) {
    request.get(`http://localhost:9000/insertSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(`เพิ่มข้อมูลวิชาเปิดสอน "${subjectCodeName}" เรียบร้อย`)
          clear()
        } else if (res.text == '0') {
          console.log('ไม่สามารถเพิ่มข้อมูลวิชาเปิดสอน(ชื่อ วิชาเปิดสอน มีในระบบแล้ว)')
        } else if (res.text == '2') {
          console.log('ไม่สามารถเพิ่มข้อมูลวิชาเปิดสอน(เกิดข้อผิดพลาด)')
        }
      });
  }

  editSubject(subjectCodeName, subjectName, subjectDescription, teacherNo, subjectStatus, subjectNo, clear) {
    request.get(`http://localhost:9000/updateSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}/${subjectStatus}/${subjectNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(`แก้ไขข้อมูลวิชาเปิดสอน "${subjectCodeName}" เรียบร้อย`)
          clear()
        } else if (res.text == '0') {
          console.log('ไม่สามารถแก้ไขข้อมูลวิชาเปิดสอน (ชื่อ วิชาเปิดสอน มีในระบบแล้ว)')
        } else if (res.text == '2') {
          console.log('ไม่สามารถเพิ่มข้อมูลวิชาเปิดสอน(เกิดข้อผิดพลาด)')
        }
      });
  }

  listSearchSubject(data) {
    request.post('http://localhost:9000/selectSubjectInfoSearchSubject')
      .send({
        subjectCodeName: data.get('subjectCodeName'),
        subjectName: data.get('subjectName'),
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        subjectStatus: data.get('subjectStatus'),
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        console.log(res.body)
        this.returnListSearchSubject = res.body
      })
  }

  checkSubjectId(subjectCodeName) {
    request.get(`http://localhost:9000/selectSubjectInfoSubjectCodeName/${subjectCodeName}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          this.flagSubjectId = res.text
        } else if (res.text === '0') {
          this.flagSubjectId = res.text
        }
      });
  }

  listSubject() {
    request.get('http://localhost:9000/selectSubjectInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.listSubject = res.body
      })
  }
}
