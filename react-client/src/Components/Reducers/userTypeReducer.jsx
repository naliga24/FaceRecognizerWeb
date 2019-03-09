import {
    LIST_PERMISSION,
    EDIT_PERMISSION,
    GET_PERMISSION_DETAIL,
    LIST_PERMISSION_ALL
} from '../Actions/types';

const initialState = [
    {
        listPermission: [],
        editFlag:[],
        token:[],
        listUserType:[]
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_PERMISSION:
            return {
                ...state,
                listPermission: action.payload
            } 
            case EDIT_PERMISSION:
            return {
                ...state,
                editFlag: action.payload
            } 
            case GET_PERMISSION_DETAIL:
                return {
                    ...state,
                    token: action.payload
                } 
            case LIST_PERMISSION_ALL:
                return {
                    ...state,
                    listUserType: action.payload
                } 
        default:
            return state;
    }
}