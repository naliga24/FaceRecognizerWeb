const request = require('superagent')

export default class userType {
  listPermission() {
    return request.get('/selectUserTypeInfo')
      .then((res) => { 
        console.log(res); return res.body; 
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }

  editPermission(userTypePermission, userTypeNo) {
    return request.put(`/updateUserTypeInfo/${userTypePermission}/${userTypeNo}`)
      .then((res) => {
        if (res.text === '1') { 
          console.log(res); return res.text;
         }
         else if (res.text ==='0') { 
          console.log('ไม่สามารถแก้ไขสิทธ์การใช้งาน(เกิดข้อผิดพลาด)');
         }
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }

  getPermissionDetail(userLogin, userPassword) {
    request.post('/selectUserPermission')
      .send({ userLogin, userPassword })
      .end((err, res) => {
        if (err) { return; }
        if (res.body.token.length > 30) {
          sessionStorage.setItem('token', res.body.token)
        }
      });
  }

  listPermissionAll() {
    return request.get('/selectUserTypeInfoAll')
      .then((res) => { console.log(res); return res.body; })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }
}
