import userType from './userType'

const request = require('superagent')

export default class user {
  searchUser(data) {
    return request.post('/selectUserInfo')
      .send({ data })
      .then((res) => {
        console.log(res); return res.body;})
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  addUser(data, clear) {
    request.post('/insertUserInfo')
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
    request.post('/updateUserInfo')
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
    return request.get(`/selectUserInactiveInfo/${userNo}`)
      .then((res) => { if (res.body) return res.body[0] })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  checkUserLogin(userLogin) {
    return request.post('/selectUserInfoUserLogin')
      .send({ userLogin })
      .then((res) => {
        if (res.text) { console.log(res); return res.text; }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  checkUserPassword(userLogin, userPassword) {
    return request.post('/selectUserInfoUserPassword')
      .send({ userLogin, userPassword })
      .then((res) => {
        if (res.text) { console.log(res); return res.text; }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  checkUserStatus(userLogin, userPassword) {
    return request.post('/selectUserInfoUserStatus')
      .send({ userLogin, userPassword })
      .then((res) => {
        if (res.text) { console.log(res); return res.text; }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }

  getUserNo(userLogin) {
    return request.post('/selectUserInfoUserLoginValue')
      .send({ userLogin })
      .then((res) => {
        if (res.body) {
        return res.body[0].USER_NO 
      } else {
        console.log('มี USER_LOGIN มากกว่า 1 หรือหา USER_LOGIN ไม่พบ(เกิดข้อผิดพลาด)')
      }
      })
      .catch(err => {
        console.log(err.message, err.response)
        throw err.message
      });
  }
}
