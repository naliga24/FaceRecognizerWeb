import axios from 'axios';
import {
    DISPLAY_REPORT_ATTENDANCE,
    DISPLAY_REPORT_TRANSACTION
} from './types';
import {
    listSemester
} from './Semester';
import {
    listSubject
} from './Subject';
import {
    listPermissionAll
} from './UserType';
import {
    listReportAttendance
} from './ClassAttendance';
import {
    listReportTransaction
} from './Login';
export const callListSemester = ()  => {
    return listSemester()
}

export const callListSubject = ()  => {
    return listSubject()
}

export const callListPermissionAll = ()  => {
    return listPermissionAll()
}

export const callListReportAttendance = (data)  => {
    return listReportAttendance(data)
}

export const displayReportAttendance = (dataReport, subjectCodeName, semesterName) => dispatch => {
    return axios.post('/displayReportClassAttendance', {
        dataReport, subjectCodeName, semesterName
    }).then(res =>
        dispatch({
            type: DISPLAY_REPORT_ATTENDANCE,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('DISPLAY_REPORT_ATTENDANCE')
}

export const callListReportTransaction = (data)  => {
    return listReportTransaction(data)
}

export const displayReportTransaction = (dataReport, startDate, endDate, userTypeName) => dispatch => {
    return axios.post('/displayReportUserTransaction', {
        dataReport, startDate, endDate, userTypeName
    }).then(res =>
        dispatch({
            type: DISPLAY_REPORT_TRANSACTION,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('DISPLAY_REPORT_TRANSACTION')
}
