const request = require('superagent')

export default class userType {
  listPermission() {
    request.get('http://localhost:9000/selectUserTypeInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }

  editPermission(userTypePermission, userTypeNo) {
    request.put(`http://localhost:9000/updateUserTypeInfo/${userTypePermission}/${userTypeNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res) {
          console.log(res)
        }
      });
  }

  getPermissionDetail(userLogin, userPassword) {
    request.post('http://localhost:9000/selectUserPermission')
      .send({ userLogin, userPassword })
      .end((err, res) => {
        if (err) { return; }
        if (res.body.token.length > 30) {
          sessionStorage.setItem('token', res.body.token)
        }
      });
  }

  listPermissionAll() {
    request.get('http://localhost:9000/selectUserTypeInfoAll')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }
}
