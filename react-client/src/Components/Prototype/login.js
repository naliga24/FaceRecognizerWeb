import user from './user'
import menu from './menu'
import userType from './userType'

const jwt = require('jsonwebtoken')
const request = require('superagent')

export default class login {
  getUserName() {
    const auth = sessionStorage.getItem('token');
    if (auth) {
      this.data7 = jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_NAME)
    }
  }

  getLoginNoLocalStorage() {
    const auth = sessionStorage.getItem('token');
    if (auth) {
      this.data1 = jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_NO)
    }
  }

  writeLogLogin(loginStatus) {
    this.getLoginNoLocalStorage()
    request.get(`/insertUserTransaction/${this.data1}/${loginStatus}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
        } else if (res.text === '0') {
          console.log('ไม่สามารถเพิ่มข้อมูล log login ได้')
        }
      })
  }

  writeLogLogout(loginStatus) {
    this.getLoginNoLocalStorage()
    request.get(`/updateUserTransaction/${this.data1}/${loginStatus}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.text === '1') {
          console.log(res)
        } else if (res.text === '0') {
          console.log('ไม่สามารถอับเดทข้อมูล log logout ได้')
        }
      })
  }

  writeLogLoginError(loginStatus, userLogin) {
    this.callGetLoginNo(userLogin)
    setTimeout(() => {
      request.get(`/insertUserTransaction/${this.data6.data6}/${loginStatus}`)
        .send()
        .end((err, res) => {
          if (err) { console.log(err); return; }
          if (res.text === '1') {
            console.log(res)
          } else if (res.text === '0') {
            console.log('ไม่สามารถเพิ่มข้อมูล log login ได้')
          }
        })
    }, 1000);
  }

  callGetPermissionDetail(userLogin, userPassword){
    this.data = new userType()
     this.data.getPermissionDetail(userLogin, userPassword)
  }

  callSetPermission() {
    this.data2 = new menu()
    this.data2.setPermission()
  }

  callCheckUserLogin = async (userLogin) => {
    this.data3 = new user()
    return await this.data3.checkUserLogin(userLogin)
  }

  callCheckUserPassword = async (userLogin, userPassword) => {
    this.data4 = new user()
    return await this.data4.checkUserPassword(userLogin, userPassword)
  }

  callCheckUserStatus = async (userLogin, userPassword) => {
    this.data5 = new user()
    return await this.data5.checkUserStatus(userLogin, userPassword)
  }

  callGetLoginNo(userLogin) {
    this.data6 = new user()
    this.data6.getUserNo(userLogin)
  }

  listReportTransaction(data) {
   return request.post('/selectUserTransactionForReport')
      .send({ startDate: data.startDateSTR, endDate: data.endDateSTR, userTypeNo: data.userTypeNo })
      .then((res) => {
        if (res.body) { console.log(res); return res.body; }
      })
      .catch(err => {
        console.log(err.message, err.response)
      });
  }
}
