import axios from 'axios';
import {
LIST_SEMESTER,
CHECK_SEMESTER_NAME,
EDIT_SEMESTER,
ADD_SEMESTER,
LIST_SEMESTER_SEARCH
} from './types';

export const listSemester = () => dispatch=>{
    return axios.get('/selectSemesterInfo').then(res =>
        dispatch({
            type: LIST_SEMESTER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SEMESTER')
}

export const checkSemesterName = (semesterName) => dispatch=>{
    return axios.post('/selectSemesterInfoSemesterName',{
        semesterName
    }).then(res =>
        dispatch({
            type: CHECK_SEMESTER_NAME,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_SEMESTER_NAME')
}

export const editSemester = (data) => dispatch=>{
    return axios.post('/updateSemesterInfo',{
        semesterName: data.semesterName,
                semesterStatusNo: data.semesterStatusNo,
                oldSemesterStatusNo: data.oldSemesterStatusNo,
                semesterNo: data.semesterNo,
    }).then(res =>
        dispatch({
            type: EDIT_SEMESTER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('CHECK_SEMESTER_NAME')
}

export const addSemester = (semesterName) => dispatch=>{
    return axios.post('/insertSemesterInfo',{
        semesterName
    }).then(res =>
        dispatch({
            type: ADD_SEMESTER,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('ADD_SEMESTER')
}

export const listSearchSemester = (data) => dispatch=>{
    return axios.post('/selectSemesterInfoSearchSemester',{
        semesterTerm: data.get('semesterTerm'),
         semesterYear: data.get('semesterYear'),
         semesterStatusNo: data.get('semesterStatusNo'),
    }).then(res =>
        dispatch({
            type: LIST_SEMESTER_SEARCH,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error);
    });
    console.log('LIST_SEMESTER_SEARCH')
}

