const jwt = require('jsonwebtoken')

const auth = sessionStorage.getItem('token')
const request = require('superagent')

export default class menu {
  setPermission() {
    console.log(auth)
    if (auth) {
      this.data = jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_TYPE_PERMISSION);
    }
  }
}
