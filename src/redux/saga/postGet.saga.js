import { put, call } from "redux-saga/effects";
import { postActionRequestSuccess } from "../actions/post.action";
import {get} from '../../api/requests/requests'
// Función que maneja la acción de solicitud GET de posts
function* handleGetPostRequest(action) {
    try {
    console.log(get)
      const response = yield call(get);
      yield put(postActionRequestSuccess(response));
  
    } catch (error) {
      console.error('Error en la saga de manejo de solicitudes GET:', error);
    }
  }

  export default handleGetPostRequest;