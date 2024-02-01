import { AUTH_ACTION_CHECK_STORAGE, AUTH_ACTION_REQUEST_FAILED, AUTH_ACTION_REQUEST_LOGOUT, AUTH_ACTION_REQUEST_STARTED,AUTH_ACTION_REQUEST_SUCCESS } from "../../constants/auth.ActionTypes";
const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false
};

//Funcion del reducer 
const ApplyGetAuthStarted = (state, action) => {
  return { //Devuelve el estado que hay modificado lo de initialState
    ...state,
    loading: true,
    user: null,
    error: null,
    isAuthenticated: false
    
  };


}

const ApplyGetAuthSuccess = (state, action) => {
      return {
      ...state,
      loading: false,
      user: action.payload,
      isAuthenticated: true
    };
}

const ApplyGetAuthFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    user: null,
    isAuthenticated: false,
    error:
      action.error && action.error.message
        ? action.error.message === "Request failed with status code 401"
          ? "Access Denied! Invalid Credentials"
          : action.error.message
        : "Credenciales invalidados",
  };
};


const ApplyCheckStorage = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    user: action.payload,
    isAuthenticated: true
  };
}

const ApplyGetLogOut = (state, action) => {
  return {
  ...state,
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false
};
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case AUTH_ACTION_REQUEST_STARTED:{
        return ApplyGetAuthStarted(state,action);
      }
      case AUTH_ACTION_REQUEST_SUCCESS:{
        return ApplyGetAuthSuccess(state,action);
      }
      case AUTH_ACTION_REQUEST_FAILED:{
        return ApplyGetAuthFailed(state,action);
      }
      case AUTH_ACTION_CHECK_STORAGE:{
        return ApplyCheckStorage(state,action);
      }
      case AUTH_ACTION_REQUEST_LOGOUT:{
        return ApplyGetLogOut(state,action);
      }
      default: return state;
  }
};

export default userReducer;

   
 /*
    case logOut.fulfilled:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false
      };
*/