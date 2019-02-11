const Multer = require('multer')

const upload = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

const user = require('./databaseQuery/user')
const userType = require('./databaseQuery/userType')
const userTransaction = require('./databaseQuery/userTransaction')
const teacher = require('./databaseQuery/teacher')
const subject = require('./databaseQuery/subject')
const student = require('./databaseQuery/student')
const semester = require('./databaseQuery/semester')
const classAttendance = require('./databaseQuery/classAttendance')
const report = require('./databaseQuery/report')

module.exports = (app) => {
  /* Login.jsx */
  app.post('/selectUserPermission', user.selectUserPermission)
  app.get('/insertUserTransaction/:loginNo/:loginStatus', user.insertUserTransaction)
  app.get('/updateUserTransaction/:loginNo/:loginStatus', user.updateUserTransaction)
  app.post('/selectUserInfoUserLogin', user.selectUserInfoUserLogin)
  app.post('/selectUserInfoUserPassword', user.selectUserInfoUserPassword)
  app.post('/selectUserInfoUserStatus', user.selectUserInfoUserStatus)
  app.post('/selectUserInfoUserLoginValue', user.selectUserInfoUserLoginValue)
  /* Configuration.jsx */
  app.put('/updateUserTypeInfo/:userTypePermission/:userTypeNo', userType.updateUserTypeInfo)
  app.get('/selectUserTypeInfo', userType.selectUserTypeInfo)
  /* User.jsx */
  app.post('/insertUserInfo', user.insertUserInfo)
  app.post('/updateUserInfo', user.updateUserInfo)
  /* UserSearch.jsx */
  app.post('/selectUserInfo', user.selectUserInfo)
  app.get('/selectUserInactiveInfo/:userNo', user.selectUserInactiveInfo)
  /* Teacher.jsx */
  app.get('/selectTeacherInfo', teacher.selectTeacherInfo)
  /* Subject.jsx */
  app.get('/insertSubjectInfo/:subjectCodeName/:subjectName/:subjectDescription/:teacherNo', subject.insertSubjectInfo)
  app.get('/updateSubjectInfo/:subjectCodeName/:subjectName/:subjectDescription/:teacherNo/:subjectStatus/:subjectNo', subject.updateSubjectInfo)
  app.get('/selectSubjectInfoSubjectCodeName/:subjectCodeName', subject.selectSubjectInfoSubjectCodeName)
  app.get('/selectSemesterInfo', semester.selectSemesterInfo)
  app.post('/selectSubjectInfoSearchSubject', subject.selectSubjectInfoSearchSubject)
  /* Teacher.jsx */
  app.get('/insertTeacherInfo/:teacherFirstName/:teacherLastName', teacher.insertTeacherInfo)
  app.get('/updateTeacherInfo/:teacherFirstName/:teacherLastName/:teacherStatus/:teacherNo', teacher.updateTeacherInfo)
  app.get('/selectTeacherFirstNameAndLastName/:teacherFirstName/:teacherLastName', teacher.selectTeacherFirstNameAndLastName)
  /* TeacherSearch.jsx */
  app.post('/selectTeacherInfoSearchTeacher', teacher.selectTeacherInfoSearchTeacher)
  /* Student.jsx */
  app.get('/selectStudentInfoStudentCodeName/:studentCodeName', student.selectStudentInfoStudentCodeName)
  app.post('/updateStudentInfo', upload.single('studentImage'), student.updateStudentInfo)
  app.post('/updateStudentInfoNoImg', student.updateStudentInfoNoImg)
  app.post('/insertStudentInfo', upload.single('studentImage'), student.insertStudentInfo)
  /* StudentSearch.jsx */
  app.post('/selectStudentInfoSearchStudent', student.selectStudentInfoSearchStudent)
  /* Semester.jsx */
  app.post('/selectSemesterInfoSemesterName', semester.selectSemesterInfoSemesterName)
  app.post('/updateSemesterInfo', semester.updateSemesterInfo)
  app.post('/insertSemesterInfo', semester.insertSemesterInfo)
  /* SemesterSearch.jsx */
  app.post('/selectSemesterInfoSearchSemester', semester.selectSemesterInfoSearchSemester)
  /* ClassAttendance.jsx */
  app.post('/selectStudentNoByStudentCodeName', student.selectStudentNoByStudentCodeName)
  app.post('/selectClassAttendanceInfoSearch', classAttendance.selectClassAttendanceInfoSearch)
  app.get('/updateClassAttendanceInfo/:studentNo/:confirmStatusNo/:classAttendanceCode', classAttendance.updateClassAttendanceInfo)
  app.get('/selectStudenNoByClassAttendanceStudentKeyCodeName/:classAttendanceStudentKeyCodeName', student.selectStudenNoByClassAttendanceStudentKeyCodeName)
  app.get('/selectSubjectInfo', subject.selectSubjectInfo)
  /* Report.jsx */
  app.post('/selectClassAttendanceInfoForReport', classAttendance.selectClassAttendanceInfoForReport)
  app.post('/selectUserTransactionForReport', userTransaction.selectUserTransactionForReport)
  app.get('/selectUserTypeInfoAll', userType.selectUserTypeInfoAll)
  app.post('/displayReportClassAttendance', report.displayReportClassAttendance)
  app.post('/displayReportUserTransaction', report.displayReportUserTransaction)
}
