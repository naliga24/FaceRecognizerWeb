const request = require('superagent')

export default class teacher {
  listTeacher() {
    request.get('/selectTeacherInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.listTeacher = res.body
      })
  }

  addTeacher(teacherFirstName, teacherLastName, clear) {
    request.get(`/insertTeacherInfo/${teacherFirstName}/${teacherLastName}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          clear()
        } else if (res.text === '0') {
        }
      })
  }

  editTeacher(teacherFirstName, teacherLastName, teacherStatus, teacherNo, clear) {
    request.get(`/updateTeacherInfo/${teacherFirstName}/${teacherLastName}/${teacherStatus}/${teacherNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          clear()
        } else if (res.text === '0') {
        }
      })
  }

  checkTeacherFirstNameAndLastName(teacherFirstName, teacherLastName) {
    request.get(`/selectTeacherFirstNameAndLastName/${teacherFirstName}/${teacherLastName}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          this.flagTeacherFirstAndLastName = res.text
        } else if (res.text === '0') {
          this.flagTeacherFirstAndLastName = res.text
        }
      })
  }

  listSearchTeacher(data) {
    request.post('/selectTeacherInfoSearchTeacher')
      .send({
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        teacherClassCount: data.get('teacherClassCount'),
        teacherStatus: data.get('teacherStatus'),
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.returnListSearchTeacher = res.body
      })
  }
}
