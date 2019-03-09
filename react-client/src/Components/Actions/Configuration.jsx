import axios from 'axios';
import { } from './types';

import {
    listPermission,
    editPermission
} from './UserType';

export const callListPermission = ()  => {
    return listPermission()
}

export const editUserType = (userTypePermission, userTypeNo) => {
    return editPermission(userTypePermission, userTypeNo)
}