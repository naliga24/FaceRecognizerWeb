const request = require('superagent')

export default class student {
  checkStudentCodeName(studentCodeName) {
    request.get(`/selectStudentInfoStudentCodeName/${studentCodeName}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          this.flagStudentCodeName = res.text
        } else if (res.text === '0') {
          this.flagStudentCodeName = res.text
        }
      })
  }

  editStudent(data, clear) {
    const formData = new FormData()
    if (typeof (data.studentImage) === 'string') {
      console.log('string')
      this.editStudentNoImgEdit(data, clear)
    } else if (typeof (data.studentImage) === 'object') {
      console.log('object')
      const imgType = data.studentImage.type.split('/')
      formData.append('studentImage', data.studentImage, `${Date.now()}.${imgType[1]}`)
      request.post('/updateStudentInfo')
        .send(formData)
        .query({
          studentCodeName: data.studentCodeName,
          studentFirstName: data.studentFirstName,
          studentLastName: data.studentLastName,
          studentStatus: data.studentStatus,
          studentNo: data.studentNo,
        })
        .end((err, res) => {
          if (err) { console.log(err); return; }
          if (res.text === '1') {
            console.log(res)
            clear()
          } else if (res.text === '0') {
          }
        })
    }
  }

  editStudentNoImgEdit(data, clear) {
    request.post('/updateStudentInfoNoImg')
      .send()
      .query({
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
        studentStatus: data.studentStatus,
        studentNo: data.studentNo,
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
        } else if (res.text == '0') {
        }
      })
  }

  addStudent(data, clear) {
    const imgType = data.studentImage.type.split('/')
    const formData = new FormData();
    formData.append('studentImage', data.studentImage, `${Date.now()}.${imgType[1]}`);
    request.post('/insertStudentInfo')
      .send(formData)
      .query({
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          clear()
        } else if (res.text == '0') {
        }
      })
  }

  listSearchStudent(data) {
    request.post('/selectStudentInfoSearchStudent')
      .send({
        studentCodeName: data.get('studentCodeName'),
        studentFirstName: data.get('studentFirstName'),
        studentLastName: data.get('studentLastName'),
        studentStatus: data.get('studentStatus'),
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.returnListSearchStudent = res.body
      })
  }

  getStudentNoByStudentCodeName(data) {
    request.post('/selectStudentNoByStudentCodeName')
      .send({ studentCodeName: data.get('studentCodeName') })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.body.length === 1) {
          this.returnStudentNo = res.body[0].STUDENT_NO
        } else if (res.body.length > 1) {
          console.log('มีข้อมูลรหัสนักศึกษาซำ้ในระบบ(เกิดข้อผิดพลาด)')
        }
      })
  }

  getStudentNoByClassAttendanceStudentKeyCodeName(classAttendanceStudentKeyCodeName) {
    request.get(`/selectStudenNoByClassAttendanceStudentKeyCodeName/${classAttendanceStudentKeyCodeName}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        console.log(res.body.length)
        if (res.body.length === 1) {
          this.returnStudentNo = res.body[0].STUDENT_NO
        } else if (res.body.length > 1) {
          console.log('มีข้อมูลรหัสนักศึกษาซำ้ในระบบ(เกิดข้อผิดพลาด)')
        }
      })
  }
}
