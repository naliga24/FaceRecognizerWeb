import {
    LIST_SEMESTER,
    CHECK_SEMESTER_NAME,
    EDIT_SEMESTER,
    ADD_SEMESTER,
    LIST_SEMESTER_SEARCH
} from '../Actions/types';

const initialState = [
    {
        listSemester: [],
        semesterNameFlag: [],
        editSemesterFlag:[],
        addSemesterFlag:[],
        listSearchSemester:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_SEMESTER:
            return {
                ...state,
                listSemester: action.payload
            }
        case CHECK_SEMESTER_NAME:
            return {
                ...state,
                semesterNameFlag: action.payload
            }
        case EDIT_SEMESTER:
            return {
                ...state,
                editSemesterFlag: action.payload
            }
            case ADD_SEMESTER:
            return {
                ...state,
                addSemesterFlag: action.payload
            }
            case LIST_SEMESTER_SEARCH:
            return {
                ...state,
                listSearchSemester: action.payload
            }
        default:
            return state;
    }
}