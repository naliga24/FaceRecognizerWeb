import {
    GET_STUDENT_NO_BY_CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME,
    LIST_SEARCH_STUDENT1,
    GET_STUDENT_NO_BY_STUDENT_CODE_NAME,
    CHECK_STUDENT_CODE_NAME,
    EDIT_STUDENT,
    EDIT_STUDENT_NO_IMG_EDIT,
    ADD_STUDENT,
    LIST_SEARCH_STUDENT
} from '../Actions/types';

const initialState = [
    {
        studentNoFromClassAttendanceStudentKeyCodeName: [],
        listSearchStudent1: [],
        returnStudentNo: [],
        studentCodeNameFlag: [],
        editStudentFlag:[],
        editStudentNoImgFlag:[],
        addStudentFlag:[],
        listSearchStudent:[]
    }
]

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENT_NO_BY_CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME:
            return {
                ...state,
                studentNoFromClassAttendanceStudentKeyCodeName: action.payload
            }
        case LIST_SEARCH_STUDENT1:
            return {
                ...state,
                listSearchStudent1: action.payload
            }
        case GET_STUDENT_NO_BY_STUDENT_CODE_NAME:
            return {
                ...state,
                returnStudentNo: action.payload
            }
        case CHECK_STUDENT_CODE_NAME:
            return {
                ...state,
                studentCodeNameFlag: action.payload
            }
            case EDIT_STUDENT:
            return {
                ...state,
                editStudentFlag: action.payload
            }
            case EDIT_STUDENT_NO_IMG_EDIT:
            return {
                ...state,
                editStudentNoImgFlag: action.payload
            }
            case ADD_STUDENT:
            return {
                ...state,
                addStudentFlag: action.payload
            }
            case LIST_SEARCH_STUDENT:
            return {
                ...state,
                listSearchStudent: action.payload
            }
        default:
            return state;
    }
}