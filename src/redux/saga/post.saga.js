import { put, call } from "redux-saga/effects";
import {
    postActionRequestFailed,
    postActionRequestSuccess
} from "../actions/post.action";
import { post } from "../../api/requests/requests";
import {posts} from "../../constants/urls";

//Funcion que revisa si ha empezado la accion de login. Si lanza AUTH_REQUEST_STARTED vendrá aqui
function* handlePostRequest(action) {
  try {
    const response = yield call(post, posts, action.payload);
    yield put(postActionRequestSuccess(response));

  } catch (error) {
    console.error('Error en la saga de manejo de post:', error);

    yield put(postActionRequestFailed(error.message));
    
  }
}

export default handlePostRequest;
