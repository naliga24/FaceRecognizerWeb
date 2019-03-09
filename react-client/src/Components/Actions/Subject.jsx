import axios from 'axios';
import {
    LIST_SUBJECT,
    CHECK_SUBJECT_ID,
    EDIT_SUBJECT,
    ADD_SUBJECT,
    LIST_SEARCH_SUBJECT
} from './types';
import {
    listTeacher
} from './Teacher';

export const listSubject = () =>dispatch=> {
    return axios.get('/selectSubjectInfo').then(res =>
        dispatch({
            type: LIST_SUBJECT,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SUBJECT')
}

export const callListTeacher = () => dispatch => {
    return listTeacher(dispatch)
}

export const checkSubjectId = (subjectCodeName) => dispatch => {
    return axios.get(`/selectSubjectInfoSubjectCodeName/${subjectCodeName}`).then(res =>
        dispatch({
            type: CHECK_SUBJECT_ID,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_SUBJECT_ID')
}

export const editSubject = (subjectCodeName, subjectName, subjectDescription, teacherNo, subjectStatus, subjectNo) => dispatch => {
    return axios.get(`/updateSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}/${subjectStatus}/${subjectNo}`).then(res =>
        dispatch({
            type: EDIT_SUBJECT,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_SUBJECT')
}

export const addSubject = (subjectCodeName, subjectName, subjectDescription, teacherNo) => dispatch => {
    return axios.get(`/insertSubjectInfo/${subjectCodeName}/${subjectName}/${subjectDescription}/${teacherNo}`).then(res =>
        dispatch({
            type: ADD_SUBJECT,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('ADD_SUBJECT')
}

export const listSearchSubject = (data) => dispatch => {
    return axios.post('/selectSubjectInfoSearchSubject', {
        subjectCodeName: data.get('subjectCodeName'),
        subjectName: data.get('subjectName'),
        teacherFirstName: data.get('teacherFirstName'),
        teacherLastName: data.get('teacherLastName'),
        subjectStatus: data.get('subjectStatus'),
    }).then(res =>
        dispatch({
            type: LIST_SEARCH_SUBJECT,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SEARCH_SUBJECT')
}
