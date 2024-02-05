import { all, takeEvery } from 'redux-saga/effects';
import handleAuthRequestStarted from './auth.saga';
import  handlePostRequestStarted  from './post.saga';
import { AUTH_ACTION_REQUEST_STARTED } from '../../constants/auth.ActionTypes';
import { GET_ACTION_REQUEST_STARTED, POST_ACTION_REQUEST_STARTED } from '../../constants/post.ActionTypes';
import handleGetPostRequest from './postGet.saga';

function* rootSaga() {
  yield all([
    takeEvery(AUTH_ACTION_REQUEST_STARTED, handleAuthRequestStarted),
    takeEvery(POST_ACTION_REQUEST_STARTED, handlePostRequestStarted),
    takeEvery(GET_ACTION_REQUEST_STARTED, handleGetPostRequest)
  ]);
}

export default rootSaga;
