import {
    UPDATE_CLASS_ATTENDANCE,
    LIST_SEARCH_CLASS_ATTENDANCE,
    LIST_REPORT_ATTENDANCE
  } from '../Actions/types';
  
  const initialState = {
    updateClassAttendanceFlag: [],
    listSearchClassAttendance:[],
    dataReportAttendance:[]
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case UPDATE_CLASS_ATTENDANCE:
        return {
          ...state,
          updateClassAttendanceFlag: action.payload,
        };
        case LIST_SEARCH_CLASS_ATTENDANCE:
        return {
          ...state,
          listSearchClassAttendance: action.payload,
        };
        case LIST_REPORT_ATTENDANCE:
        return {
          ...state,
          dataReportAttendance: action.payload,
        };
      default:
        return state;
    }
  }