import {
    SET_PERMISSION
} from '../Actions/types';

const initialState = [
    {
        userTypePermission:[],
    },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PERMISSION:
            return {
                ...state,
                userTypePermission:action.payload
            } 
        default:
            return state;
    }
}