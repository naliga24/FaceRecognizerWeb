import {
    DISPLAY_REPORT_ATTENDANCE,
    DISPLAY_REPORT_TRANSACTION
} from '../Actions/types';

const initialState = [
    {
        reportAttendanceFlag:[],
        reportTransactionFlag:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_REPORT_ATTENDANCE:
            return {
                ...state,
                reportAttendanceFlag:action.payload
            } 
            case DISPLAY_REPORT_TRANSACTION:
            return {
                ...state,
                reportTransactionFlag:action.payload
            } 
        default:
            return state;
    }
}