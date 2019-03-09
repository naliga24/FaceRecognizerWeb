import axios from 'axios';
import {
    LIST_PERMISSION,
    EDIT_PERMISSION,
    GET_PERMISSION_DETAIL,
    LIST_PERMISSION_ALL
} from './types';


export const listPermission = () => dispatch => {
    return axios.get('/selectUserTypeInfo').then(res =>
        dispatch({
            type: LIST_PERMISSION,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_PERMISSION')
}

export const editPermission = (userTypePermission, userTypeNo) => dispatch => {
    return axios.put(`/updateUserTypeInfo/${userTypePermission}/${userTypeNo}`).then(res =>
        dispatch({
            type: EDIT_PERMISSION,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_PERMISSION')
}

export const getPermissionDetail = (userLogin, userPassword) => dispatch => {
    return axios.post('/selectUserPermission', {
        userLogin, userPassword
    }).then(res =>
        dispatch({
            type: GET_PERMISSION_DETAIL,
            payload: res.data.token
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('GET_PERMISSION_DETAIL')
}

export const listPermissionAll = () => dispatch => {
    return axios.get('/selectUserTypeInfoAll').then(res =>
        dispatch({
            type: LIST_PERMISSION_ALL,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_PERMISSION_ALL')
}
