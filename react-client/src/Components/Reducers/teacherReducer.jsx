import {
    LIST_TEACHER,
    CHECK_TEACHER_FIRST_NAME_AND_LAST_NAME,
    EDIT_TEACHER,
    ADD_TEACHER,
    LIST_SEARCH_TEACHER
} from '../Actions/types';

const initialState = [
    {
        listTeacher: [],
        TeacherFirstNameAndLastNameFlag:[],
        editTeacherFlag:[],
        addTeacherFlag:[],
        listSearchTeacher:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_TEACHER:
            return {
                ...state,
                listTeacher: action.payload
            } 
            case CHECK_TEACHER_FIRST_NAME_AND_LAST_NAME:
            return {
                ...state,
                TeacherFirstNameAndLastNameFlag: action.payload
            } 
            case EDIT_TEACHER:
            return {
                ...state,
                editTeacherFlag: action.payload
            } 
            case ADD_TEACHER:
            return {
                ...state,
                addTeacherFlag: action.payload
            } 
            case LIST_SEARCH_TEACHER:
            return {
                ...state,
                listSearchTeacher: action.payload
            } 
        default:
            return state;
    }
}