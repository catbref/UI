import { STORE_MUTED_USERS } from '../user-action-types.js'

export const doSaveMutedUsers = (users) => {
    return (dispatch, getState) => {
        return dispatch(saveMutedUsers(users))
    }
}

export const saveMutedUsers = (payload) => {  
    return {
        type: STORE_MUTED_USERS,
        payload
    }
}