const request = require('superagent')

export default class semester {
  checkSemesterName(semesterName) {
    request.post('https://facerecognizerweb.herokuapp.com/selectSemesterInfoSemesterName')
      .send({ semesterName })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          this.flagSemesterName = res.text
        } else if (res.text == '0') {
          this.flagSemesterName = res.text
        }
      })
  }

  editSemester(data, clear) {
    request.post('https://facerecognizerweb.herokuapp.com/updateSemesterInfo')
      .send({
        semesterName: data.semesterName,
        semesterStatusNo: data.semesterStatusNo,
        oldSemesterStatusNo: data.oldSemesterStatusNo,
        semesterNo: data.semesterNo,
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

  addSemester(semesterName, clear) {
    request.post('https://facerecognizerweb.herokuapp.com/insertSemesterInfo')
      .send({ semesterName })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
          clear()
        } else if (res.text == '0') {
        }
      })
  }

  listSearchSemester(data) {
    request.post('https://facerecognizerweb.herokuapp.com/selectSemesterInfoSearchSemester')
      .send({
        semesterTerm: data.get('semesterTerm'),
        semesterYear: data.get('semesterYear'),
        semesterStatusNo: data.get('semesterStatusNo'),
      })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.returnListSearchSemester = res.body
      })
  }

  listSemester() {
    request.get('https://facerecognizerweb.herokuapp.com/selectSemesterInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.listSemester = res.body
      })
  }
}
