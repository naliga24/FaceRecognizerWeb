import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import classAttendanceReducer from './classAttendanceReducer';
import studentReducer from './studentReducer';
import semesterReducer from './semesterReducer';
import subjectReducer from './subjectReducer';
import userTypeReducer from './userTypeReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import reportReducer from './reportReducer';
import teacherReducer from './teacherReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  classAttendance:classAttendanceReducer,
  student:studentReducer,
  semester:semesterReducer,
  subject:subjectReducer,
  userType:userTypeReducer,
  user:userReducer,
  login:loginReducer,
  report:reportReducer,
  teacher:teacherReducer,
  menu:menuReducer
});