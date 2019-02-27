import userType from './userType'

export default class configuration {
  editUserType = async (userTypePermission, userTypeNo) => {
    let userTypeObj = new userType()
    return await userTypeObj.editPermission(userTypePermission, userTypeNo)
  }

  callListPermission = async () => {
    let userTypeObj = new userType()
    return await userTypeObj.listPermission()
  }
}
