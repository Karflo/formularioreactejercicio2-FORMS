import { AUTH_ACTION_CHECK_STORAGE, AUTH_ACTION_REQUEST_FAILED, AUTH_ACTION_REQUEST_STARTED,AUTH_ACTION_REQUEST_SUCCESS,AUTH_ACTION_REQUEST_LOGOUT } from "../../constants/auth.ActionTypes";
//Acciones sobre el auth de login
const authActionRequestStarted = (userCredential) => {

    return {
        type: AUTH_ACTION_REQUEST_STARTED,
        payload: userCredential
        //Type seria la String de AcyionTypes y la payload los datos existentes
    }


}

const authActionRequestSuccess = (user) => {

    return {
        type: AUTH_ACTION_REQUEST_SUCCESS,
        payload: user
        //Type seria la String de AcyionTypes y la payload los datos existentes
    }


}

const authActionRequestFailed = (error) => {

    return {
        type: AUTH_ACTION_REQUEST_FAILED,
        payload: error
        //Type seria la String de AcyionTypes y la payload los datos existentes
    }


}

const authActionCheckStorage = (user) => {

    return {
        type: AUTH_ACTION_CHECK_STORAGE,
        payload: user
        //Type seria la String de AcyionTypes y la payload los datos existentes
    }


}

const authActionRequestLogout = () => {

    return {
        type: AUTH_ACTION_REQUEST_LOGOUT
                //Type seria la String de AcyionTypes y la payload los datos existentes
    }


}


export {
    authActionRequestStarted,
    authActionRequestSuccess,
    authActionRequestFailed,
    authActionCheckStorage,
    authActionRequestLogout
}