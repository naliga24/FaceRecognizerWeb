const request = require('superagent')

export default class semester {
  checkSemesterName(semesterName) {
    return request.post('/selectSemesterInfoSemesterName')
      .send({ semesterName })
      .then((res) => {
        if (res.text === '1' || res.text ==='0') { 
          console.log(res); return res.text;
         }else if(res.text === '2'){
           console.log('มีชื่อภาคการศึกษาซำ้ในระบบ(เกิดข้อผิดพลาด)')
         }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
     });
  }

  editSemester(data, clear) {
    request.post('/updateSemesterInfo')
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
    request.post('/insertSemesterInfo')
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
    return request.post('/selectSemesterInfoSearchSemester')
      .send({
        semesterTerm: data.get('semesterTerm'),
        semesterYear: data.get('semesterYear'),
        semesterStatusNo: data.get('semesterStatusNo'),
      })
      .then((res) => {
        console.log(res); return res.body;})
      .catch(err => {
        console.log(err.message, err.response)
      });
  }

  listSemester() {
    return request.get('/selectSemesterInfo')
      .then((res) => {
        console.log(res); return res.body;})
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }
}
