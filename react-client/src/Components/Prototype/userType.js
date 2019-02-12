const request = require('superagent')

export default class userType {
  listPermission() {
    request.get('https://facerecognizerweb.herokuapp.com/selectUserTypeInfo')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }

  editPermission(userTypePermission, userTypeNo) {
    request.put(`https://facerecognizerweb.herokuapp.com/updateUserTypeInfo/${userTypePermission}/${userTypeNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res) {
          console.log(res)
        }
      });
  }

  getPermissionDetail(userLogin, userPassword) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserPermission')
      .send({ userLogin, userPassword })
      .end((err, res) => {
        if (err) { return; }
        if (res.body.token.length > 30) {
          sessionStorage.setItem('token', res.body.token)
        }
      });
  }

  listPermissionAll() {
    request.get('https://facerecognizerweb.herokuapp.com/selectUserTypeInfoAll')
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data = res.body
      })
  }
}
