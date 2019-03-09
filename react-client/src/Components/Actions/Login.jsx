import axios from 'axios';
const jwt = require('jsonwebtoken')
import {
    WRITE_LOG_LOGIN,
    WRITE_LOG_LOGIN_ERROR,
    LIST_REPORT_TRANSACTION,
    WRITE_LOG_LOGOUT,
    GET_USER_NAME
} from './types';
import {
    checkUserLogin,
    checkUserPassword,
    checkUserStatus,
    getUserNo
} from './User';
import {
    getPermissionDetail
} from './UserType'
import {
    setPermission
} from './Menu'

export const callCheckUserLogin = (userLogin)  => {
    return checkUserLogin(userLogin)
}

export const callCheckUserPassword = (userLogin, userPassword)  => {
    return checkUserPassword(userLogin, userPassword)
}

export const callCheckUserStatus = (userLogin, userPassword)  => {
    return checkUserStatus(userLogin, userPassword)
}

export const callGetPermissionDetail = (userLogin, userPassword)  => {
    return getPermissionDetail(userLogin, userPassword)
}

const getLoginNoLocalStorage = () => {
    console.log('getLoginNoLocalStorage')
    const auth = sessionStorage.getItem('token');
    if (auth) {
        return jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_NO)
    }
}

export const writeLogLogin = (loginStatus) => dispatch => {
    const loginNo = getLoginNoLocalStorage()
    return axios.get(`/insertUserTransaction/${loginNo}/${loginStatus}`).then(res =>
        dispatch({
            type: WRITE_LOG_LOGIN,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('WRITE_LOG_LOGIN')
}

export const writeLogLoginError = (loginStatus, loginNo) => dispatch => {
    return axios.get(`/insertUserTransaction/${loginNo}/${loginStatus}`).then(res =>
        dispatch({
            type: WRITE_LOG_LOGIN_ERROR,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('WRITE_LOG_LOGIN_ERROR')
}

export const callGetLoginNo = (userLogin)  => {
    return getUserNo(userLogin)
}

export const listReportTransaction = (data) => dispatch=>{
    return axios.post('/selectUserTransactionForReport', {
        startDate: data.startDateSTR, endDate: data.endDateSTR, userTypeNo: data.userTypeNo
    }).then(res =>
        dispatch({
            type: LIST_REPORT_TRANSACTION,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_REPORT_TRANSACTION')
}

export const writeLogLogout = (loginStatus) => dispatch => {
    const loginNo = getLoginNoLocalStorage()
    return axios.get(`/updateUserTransaction/${loginNo}/${loginStatus}`).then(res =>
        dispatch({
            type: WRITE_LOG_LOGOUT,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('WRITE_LOG_LOGOUT')
}

export const callSetPermission = () =>{
    return setPermission()
}

export const getUserName = () => dispatch => {
    const auth = sessionStorage.getItem('token');
    if (auth) {
        const userName = jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_NAME)
        return dispatch({
            type: GET_USER_NAME,
            payload: userName
        })

    }
}


