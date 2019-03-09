import {
    CHECK_USER_LOGIN,
    CHECK_USER_PASSWORD,
    CHECK_USER_STATUS,
    GET_USER_NO,
    GET_INACTIVE_INFO,
    EDIT_USER,
    ADD_USER,
    SEARCH_USER
} from '../Actions/types';

const initialState = [
    {
        userLoginFlag: [],
        userPasswordFlag: [],
        userStatusFlag: [],
        userNo: [],
        inactiveInfo: [],
        editUserFlag: [],
        addUserFlag: [],
        listSearchUser:[]
    }
]

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_USER_LOGIN:
            return {
                ...state,
                userLoginFlag: action.payload
            }
        case CHECK_USER_PASSWORD:
            return {
                ...state,
                userPasswordFlag: action.payload
            }
        case CHECK_USER_STATUS:
            return {
                ...state,
                userStatusFlag: action.payload
            }
        case GET_USER_NO:
            return {
                ...state,
                userNo: action.payload
            }
        case GET_INACTIVE_INFO:
            return {
                ...state,
                inactiveInfo: action.payload
            }
        case EDIT_USER:
            return {
                ...state,
                editUserFlag: action.payload
            }
        case ADD_USER:
            return {
                ...state,
                addUserFlag: action.payload
            }
        case SEARCH_USER:
            return {
                ...state,
                listSearchUser: action.payload
            }
        default:
            return state;
    }
}