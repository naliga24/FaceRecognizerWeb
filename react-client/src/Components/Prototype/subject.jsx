import teacher from './teacher'
import semester from './semester'

const request = require('superagent')

export default class subject {
  callListTeacher = async () => {
    this.teacher = new teacher()
    return await this.teacher.listTeacher()
  }

  addSubject(subjectCodeName, subjectName, subjectDescription, teacherNo, clear) {
    request.get(`/insertSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}`)
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
    request.get(`/updateSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}/${subjectStatus}/${subjectNo}`)
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
    return request.post('/selectSubjectInfoSearchSubject')
      .send({
        subjectCodeName: data.get('subjectCodeName'),
        subjectName: data.get('subjectName'),
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        subjectStatus: data.get('subjectStatus'),
      })
      .then((res) => {
        console.log(res); return res.body;
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }

  checkSubjectId(subjectCodeName) {
    return request.get(`/selectSubjectInfoSubjectCodeName/${subjectCodeName}`)
      .send()
      .then((res) => {
        if (res.text === '1' || res.text === '0') {
          console.log(res); return res.text;
        } else if (res.text === '2') {
          console.log('มีรหัสวิชาซำ้ในระบบ(เกิดข้อผิดพลาด)')
        }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  listSubject() {
    return request.get('/selectSubjectInfo')
      .then((res) => {
        console.log(res); return res.body;
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }
}
