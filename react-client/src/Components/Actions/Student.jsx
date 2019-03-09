import axios from 'axios';
import {
    GET_STUDENT_NO_BY_CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME,
    LIST_SEARCH_STUDENT1,
    GET_STUDENT_NO_BY_STUDENT_CODE_NAME,
    CHECK_STUDENT_CODE_NAME,
    EDIT_STUDENT,
    EDIT_STUDENT_NO_IMG_EDIT,
    ADD_STUDENT,
    LIST_SEARCH_STUDENT
} from './types';


export const getStudentNoByClassAttendanceStudentKeyCodeName = (classAttendanceStudentKeyCodeName) => dispatch => {
    return axios.get(`/selectStudenNoByClassAttendanceStudentKeyCodeName/${classAttendanceStudentKeyCodeName}`).then(res =>
        dispatch({
            type: GET_STUDENT_NO_BY_CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('GET_STUDENT_NO_BY_CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME')
}

export const listSearchStudent1 = (data) => dispatch => {
    return axios.post('/selectStudentInfoSearchStudent', {
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
        studentStatus: data.studentStatus,
    }).then(res => {
        dispatch({
            type: LIST_SEARCH_STUDENT1,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SEARCH_STUDENT1')
}

export const getStudentNoByStudentCodeName = (data) =>dispatch=> {
    return axios.post('/selectStudentNoByStudentCodeName', {
        studentCodeName: data.get('studentCodeName')
    }).then(res => {
        dispatch({
            type: GET_STUDENT_NO_BY_STUDENT_CODE_NAME,
            payload: res.data[0].STUDENT_NO
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('GET_STUDENT_NO_BY_STUDENT_CODE_NAME')
}

export const checkStudentCodeName = (studentCodeName) => dispatch => {
    return axios.get(`/selectStudentInfoStudentCodeName/${studentCodeName}`).then(res => {
        dispatch({
            type: CHECK_STUDENT_CODE_NAME,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_STUDENT_CODE_NAME')
}

export const editStudent = (data) => dispatch => {
    const formData = new FormData()
    console.log('object')
    const imgType = data.studentImage.type.split('/')
    formData.append('studentImage', data.studentImage, `${Date.now()}.${imgType[1]}`)
    formData.append('data', JSON.stringify({
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
        studentStatus: data.studentStatus,
        studentNo: data.studentNo,
    }))
    return axios.post('/updateStudentInfo', formData).then(res => {
        dispatch({
            type: EDIT_STUDENT,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_STUDENT')
}

export const editStudentNoImgEdit = (data) => dispatch => {
    return axios.post('/updateStudentInfoNoImg', {
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
        studentStatus: data.studentStatus,
        studentNo: data.studentNo,
    }).then(res => {
        dispatch({
            type: EDIT_STUDENT_NO_IMG_EDIT,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('EDIT_STUDENT_NO_IMG_EDIT')
}

export const addStudent = (data) => dispatch => {
    const imgType = data.studentImage.type.split('/')
    const formData = new FormData();
    formData.append('studentImage', data.studentImage, `${Date.now()}.${imgType[1]}`);
    formData.append('data', JSON.stringify({
        studentCodeName: data.studentCodeName,
        studentFirstName: data.studentFirstName,
        studentLastName: data.studentLastName,
    }))
    return axios.post('/insertStudentInfo', formData).then(res => {
        dispatch({
            type: ADD_STUDENT,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('ADD_STUDENT')
}

export const listSearchStudent = (data) => dispatch => {
    return axios.post('/selectStudentInfoSearchStudent', {
        studentCodeName: data.get('studentCodeName'),
        studentFirstName: data.get('studentFirstName'),
        studentLastName: data.get('studentLastName'),
        studentStatus: data.get('studentStatus'),
    }).then(res => {
        dispatch({
            type: LIST_SEARCH_STUDENT,
            payload: res.data
        })
    }).catch(function (error) {
        console.log(error);
    });
    console.log('ADD_STUDENT')
}


