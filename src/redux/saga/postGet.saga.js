import { put, call } from "redux-saga/effects";
import { postActionRequestSuccess } from "../actions/post.action";
import {get} from '../../api/requests/requests'
import {posts} from '../../constants/urls'
// Función que maneja la acción de solicitud GET de posts
function* handleGetPostRequest(action) {
    try {
      const response = yield call(get, posts);
      console.log(response)
      yield put(postActionRequestSuccess(response));
  
    } catch (error) {
      console.error('Error en la saga de manejo de solicitudes GET:', error);
    }
  }

  export default handleGetPostRequest;