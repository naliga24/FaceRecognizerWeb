import axios from 'axios';
import {
    LIST_TEACHER,
    CHECK_TEACHER_FIRST_NAME_AND_LAST_NAME,
    EDIT_TEACHER,
    ADD_TEACHER,
    LIST_SEARCH_TEACHER
} from './types';

export const listTeacher = () => dispatch => {
    return axios.get('/selectTeacherInfo').then(res =>
        dispatch({
            type: LIST_TEACHER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_TEACHER')
}

export const checkTeacherFirstNameAndLastName = (teacherFirstName, teacherLastName) => dispatch => {
    return axios.get(`/selectTeacherFirstNameAndLastName/${teacherFirstName}/${teacherLastName}`).then(res =>
        dispatch({
            type: CHECK_TEACHER_FIRST_NAME_AND_LAST_NAME,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_TEACHER_FIRST_NAME_AND_LAST_NAME')
}

export const editTeacher = (teacherFirstName, teacherLastName, teacherStatus, teacherNo) => dispatch => {
    return axios.get(`/updateTeacherInfo/${teacherFirstName}/${teacherLastName}/${teacherStatus}/${teacherNo}`).then(res =>
        dispatch({
            type: EDIT_TEACHER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_TEACHER')
}

export const addTeacher = (teacherFirstName, teacherLastName) => dispatch => {
    return axios.get(`/insertTeacherInfo/${teacherFirstName}/${teacherLastName}`).then(res =>
        dispatch({
            type: ADD_TEACHER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('ADD_TEACHER')
}

export const listSearchTeacher = (data) => dispatch => {
    return axios.post('/selectTeacherInfoSearchTeacher', {
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        teacherClassCount: data.get('teacherClassCount'),
        teacherStatus: data.get('teacherStatus'),
    }).then(res =>
        dispatch({
            type: LIST_SEARCH_TEACHER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SEARCH_TEACHER')
}

