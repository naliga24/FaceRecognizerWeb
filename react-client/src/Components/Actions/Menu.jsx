const jwt = require('jsonwebtoken')

import {
    SET_PERMISSION
} from './types';

export const setPermission = ()  => dispatch=>{
    const auth = sessionStorage.getItem('token')
    console.log(auth)
    if (auth) {
        const userTypePermission = jwt.verify(auth, 'shhhhh', (err, decoded) => decoded.USER_TYPE_PERMISSION);
        return dispatch({
            type: SET_PERMISSION,
            payload: userTypePermission
        })
    }
}