const request = require('superagent')

export default class userType {
  listPermission() {
    request.get('/selectUserTypeInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }

  editPermission(userTypePermission, userTypeNo) {
    request.put(`/updateUserTypeInfo/${userTypePermission}/${userTypeNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res) {
          console.log(res)
        }
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
    request.get('/selectUserTypeInfoAll')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }
}
