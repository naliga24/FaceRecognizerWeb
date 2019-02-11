import userType from './userType'

export default class configuration {
  editUserType(userTypePermission, userTypeNo) {
    this.data = new userType()
    this.data.editPermission(userTypePermission, userTypeNo)
  }

  callListPermission() {
    this.data1 = new userType()
    this.data1.listPermission()
  }
}
