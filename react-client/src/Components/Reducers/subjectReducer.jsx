import {
    LIST_SUBJECT,
    CHECK_SUBJECT_ID,
    EDIT_SUBJECT,
    ADD_SUBJECT,
    LIST_SEARCH_SUBJECT
} from '../Actions/types';

const initialState = [
    {
        listSubject: [],
        subjectIdFlag:[],
        editSubjectFlag:[],
        addSubjectFlag:[],
        listSearchSubject:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_SUBJECT:
            return {
                ...state,
                listSubject: action.payload
            } 
            case CHECK_SUBJECT_ID:
            return {
                ...state,
                subjectIdFlag: action.payload
            } 
            case EDIT_SUBJECT:
            return {
                ...state,
                editSubjectFlag: action.payload
            } 
            case ADD_SUBJECT:
            return {
                ...state,
                addSubjectFlag: action.payload
            } 
            case LIST_SEARCH_SUBJECT:
            return {
                ...state,
                listSearchSubject: action.payload
            } 
        default:
            return state;
    }
}