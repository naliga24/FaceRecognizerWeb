import axios from 'axios';
import {
  UPDATE_CLASS_ATTENDANCE,
  LIST_SEARCH_CLASS_ATTENDANCE,
  LIST_REPORT_ATTENDANCE
} from './types';
import {
  getStudentNoByClassAttendanceStudentKeyCodeName,
  listSearchStudent1,
  listSearchStudent,
  getStudentNoByStudentCodeName
} from './Student';
import {
  listSemester
} from './Semester';
import {
  listSubject
} from './Subject'

export const updateClassAttendance = (studentNo, confirmStatusNo, classAttendanceCode) => dispatch => {
  axios.get(`/updateClassAttendanceInfo/${studentNo}/${confirmStatusNo}/${classAttendanceCode}`).then(res =>
    dispatch({
      type: UPDATE_CLASS_ATTENDANCE,
      payload: res.data
    })
  ).catch(function (error) {
    console.log(error);
  });
  console.log('UPDATE_CLASS_ATTENDANCE')
};

export const callGetStudentNoByClassAttendanceStudentKeyCodeName = (classAttendanceStudentKeyCodeName) => {
  return getStudentNoByClassAttendanceStudentKeyCodeName(classAttendanceStudentKeyCodeName)
}

export const callListSearchStudent1 = (data) => {
  return listSearchStudent1(data)
}

export const callGetStudentNoByStudentCodeName = (studentCodeName) => {
  return getStudentNoByStudentCodeName(studentCodeName)
}

export const callListSemester = () => {
  return listSemester()
}

export const callListSubject = () => {
  return listSubject()
}

export const listSearchClassAttendance = (data) => dispatch => {
  return axios.post('/selectClassAttendanceInfoSearch', {
    classAttendanceCode: data.get('classAttendanceCode'),
    startDateSTR: data.get('startDateSTR'),
    endDateSTR: data.get('endDateSTR'),
    studentNo: data.get('studentNo'),
    subjectNo: data.get('subjectNo'),
    confirmStatusNo: data.get('confirmStatusNo'),
    semesterNo: data.get('semesterNo'),
  }).then(res => { 
    dispatch({
      type: LIST_SEARCH_CLASS_ATTENDANCE,
      payload: res.data
    })
    console.log('dispatch');
}
).catch (function (error) {
  console.log(error);
});
console.log('UPDATE_CLASS_ATTENDANCE')
}

export const listReportAttendance = (data) => dispatch => {
  return axios.post('/selectClassAttendanceInfoForReport', {
    subjectNo: data.subjectNo, semesterNo: data.semesterNo
  }).then(res =>
    dispatch({
      type: LIST_REPORT_ATTENDANCE,
      payload: res.data
    })
  ).catch(function (error) {
    console.log(error);
  });
  console.log('LIST_REPORT_ATTENDANCE')
}

export const callListSearchStudent = (data) => {
  return listSearchStudent(data)
}