const request = require('superagent')

export default class teacher {
  listTeacher() {
    return request.get('/selectTeacherInfo')
      .send()
      .then((res) => {
        if (res) { console.log(res.body); return res.body; }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
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
    return request.get(`/selectTeacherFirstNameAndLastName/${teacherFirstName}/${teacherLastName}`)
      .send()
      .then((res) => {
        if (res.text === '1' || res.text === '0') {
          console.log(res); return res.text;
        } else if (res.text === '2') {
          console.log('มีชื่ออาจารย์ซำ้ในระบบ(*ชื่อและนามสกุลซำ้พร้อมกัน* เกิดข้อผิดพลาด)')
        }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  listSearchTeacher(data) {
    return request.post('/selectTeacherInfoSearchTeacher')
      .send({
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        teacherClassCount: data.get('teacherClassCount'),
        teacherStatus: data.get('teacherStatus'),
      })
      .then((res) => {
        console.log(res); return res.body;
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }
}
