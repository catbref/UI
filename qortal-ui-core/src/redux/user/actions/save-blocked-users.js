import { STORE_BLOCKED_USERS } from '../user-action-types.js'

export const doSaveBlockedUsers = (users) => {
    console.log("doSaveBlockedUsers")
    return (dispatch, getState) => {
        return dispatch(saveBlockedUsers(users))
    }
}

export const saveBlockedUsers = (payload) => {  
    console.log("saveBlockedUsers") 
    return {
        type: STORE_BLOCKED_USERS,
        payload
    }
}