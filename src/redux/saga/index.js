import { all, takeEvery } from 'redux-saga/effects';
import handleAuthRequestStarted from './auth.saga'; //Liugar donde encuentro todas las sagas
import { AUTH_ACTION_REQUEST_STARTED } from '../../constants/auth.ActionTypes';

function* rootSaga() {
  yield all([yield takeEvery(
    AUTH_ACTION_REQUEST_STARTED, handleAuthRequestStarted
  )]);
}

export default rootSaga;

//Lugar donde conecto todas las peticiones SAGA