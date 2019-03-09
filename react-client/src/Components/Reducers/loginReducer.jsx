import {
    WRITE_LOG_LOGIN,
    WRITE_LOG_LOGIN_ERROR,
    LIST_REPORT_TRANSACTION,
    WRITE_LOG_LOGOUT,
    GET_USER_NAME
} from '../Actions/types';

const initialState = [
    {
        logLoginFlag: [],
        logLoginErrFlag: [],
        dataReportTransaction: [],
        logLogoutFlag:[],
        userName:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case WRITE_LOG_LOGIN:
            return {
                ...state,
                logLoginFlag: action.payload
            }
        case WRITE_LOG_LOGIN_ERROR:
            return {
                ...state,
                logLoginErrFlag: action.payload
            }
        case LIST_REPORT_TRANSACTION:
            return {
                ...state,
                dataReportTransaction: action.payload
            }
            case WRITE_LOG_LOGOUT:
            return {
                ...state,
                logLogoutFlag: action.payload
            }
            case GET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            }
        default:
            return state;
    }
}