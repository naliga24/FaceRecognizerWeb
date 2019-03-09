import axios from 'axios';
import {
    CHECK_USER_LOGIN,
    CHECK_USER_PASSWORD,
    CHECK_USER_STATUS,
    GET_USER_NO,
    GET_INACTIVE_INFO,
    EDIT_USER,
    ADD_USER,
    SEARCH_USER
} from './types';


export const checkUserLogin = (userLogin) => dispatch => {
    return axios.post('/selectUserInfoUserLogin', {
        userLogin
    }).then(res =>
        dispatch({
            type: CHECK_USER_LOGIN,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_USER_LOGIN')
}

export const checkUserPassword = (userLogin, userPassword) =>dispatch=> {
    return axios.post('/selectUserInfoUserLogin', {
        userLogin, userPassword
    }).then(res =>
        dispatch({
            type: CHECK_USER_PASSWORD,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_USER_PASSWORD')
}

export const checkUserStatus = (userLogin, userPassword) =>dispatch=> {
    return axios.post('/selectUserInfoUserStatus', {
        userLogin, userPassword
    }).then(res =>
        dispatch({
            type: CHECK_USER_STATUS,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_USER_STATUS')
}

export const getUserNo = (userLogin) =>dispatch=> {
    return axios.post('/selectUserInfoUserLoginValue', {
        userLogin
    }).then(res =>
        dispatch({
            type: GET_USER_NO,
            payload: res.data[0].USER_NO
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('GET_USER_NO')
}

export const getInactiveInfo = (userNo) => dispatch => {
    return axios.get(`/selectUserInactiveInfo/${userNo}`).then(res =>
        dispatch({
            type: GET_INACTIVE_INFO,
            payload: res.data[0]
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('GET_INACTIVE_INFO')
}

export const editUser = (data) => dispatch => {
    return axios.post('/updateUserInfo', {
        data
    }).then(res =>
        dispatch({
            type: EDIT_USER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_USER')
}

export const addUser = (data) => dispatch => {
    return axios.post('/insertUserInfo', {
        data
    }).then(res =>
        dispatch({
            type: ADD_USER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_USER')
}

export const searchUser = (data) => dispatch => {
    return axios.post('/selectUserInfo', {
        data
    }).then(res =>
        dispatch({
            type: SEARCH_USER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('SEARCH_USER')
}
