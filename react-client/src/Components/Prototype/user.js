import userType from './userType.js'

const request = require('superagent')

export default class user {
  searchUser(data) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserInfo')
      .send({ data })
      .end((err, res) => {
        if (err) { console.log(err); return; }
        this.data1 = res.body
        console.log(res.body)
      })
  }

  addUser(data, clear) {
    request.post('https://facerecognizerweb.herokuapp.com/insertUserInfo')
      .send({ data })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          // this.alert_msg = `เพิ่มข้อมูลผู้ใช้งานระบบเรียบร้อย "${userName}"`
          clear()
        } else if (res.text === '0') {
          alertify.alert('ไม่สามารถแก้ข้อมูลผู้ใช้งานระบบ (ชื่อ Login Name มีในระบบแล้ว ) ')
        } else if (res.text === '2') {
          console.log('ไม่สามารถเพิ่มข้อมูลผู้ใช้งานระบบ(เกิดข้อผิดพลาด)')
        }
      });
  }

  editUser(data, clear) {
    request.post('https://facerecognizerweb.herokuapp.com/updateUserInfo')
      .send({ data })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          // this.alert_msg = `แก้ข้อมูลผู้ใช้งานระบบ "${userName}" เรียบร้อย`
          clear()
        } else if (res.text === '0') {
          alertify.alert('ไม่สามารถแก้ข้อมูลผู้ใช้งานระบบ (ชื่อ Login Name มีในระบบแล้ว )')
        } else if (res.text === '2') {
          console.log('ไม่สามารถเพิ่มข้อมูลการไม่ใช้งานระบบ(เกิดข้อผิดพลาด)')
        }
      });
  }

  getInactiveInfo(userNo) {
    request.get(`https://facerecognizerweb.herokuapp.com/selectUserInactiveInfo/${userNo}`)
      .send()
      .end((err, res) => {
        if (err) { console.log(err); return; }
        if (res.body) {
          this.data2 = res.body[0]
          console.log(res.body[0])
        }
      })
  }

  checkUserLogin(userLogin) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserInfoUserLogin')
      .send({ userLogin })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          this.data3 = res.text
        } else if (res.text === '0') {
          this.data3 = res.text
        }
      });
  }

  checkUserPassword(userLogin, userPassword) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserInfoUserPassword')
      .send({ userLogin, userPassword })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          this.data4 = res.text
        } else if (res.text === '0') {
          this.data4 = res.text
        }
      });
  }

  checkUserStatus(userLogin, userPassword) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserInfoUserStatus')
      .send({ userLogin, userPassword })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.text === '1') {
          console.log(res)
          this.data5 = res.text
        } else if (res.text === '0') {
          this.data5 = res.text
        }
      });
  }

  getUserNo(userLogin) {
    request.post('https://facerecognizerweb.herokuapp.com/selectUserInfoUserLoginValue')
      .send({ userLogin })
      .end((err, res) => {
        if (err) { console.log(err); return }
        if (res.body) {
          this.data6 = res.body[0].USER_NO
        } else {
          console.log('มี USER_LOGIN มากกว่า 1 หรือหา USER_LOGIN ไม่พบ(เกิดข้อผิดพลาด)')
        }
      });
  }
}
