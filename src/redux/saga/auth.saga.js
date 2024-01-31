import { put, call } from "redux-saga/effects";
import {
  authActionRequestFailed,
  authActionRequestSuccess,
} from "../actions/auth.action";
import { postToken } from "../../api/requests/requests";


//Funcion que revisa si ha empezado la accion de login
function* handleAuthRequest(action) {
  try {
    const response = yield call(postToken, '/auth/login', action.payload);
    yield put(authActionRequestSuccess(response));
  } catch (error) {
    yield put(authActionRequestFailed(error.message));
  }
}

export default handleAuthRequest;
