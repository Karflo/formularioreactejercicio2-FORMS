import {
  POST_ACTION_REQUEST_STARTED,
  POST_ACTION_REQUEST_FAILED,
  POST_ACTION_REQUEST_SUCCESS,
  POST_ACTION_UPDATE_DATA,
  GET_ACTION_REQUEST_FAILED,
  GET_ACTION_REQUEST_STARTED,
  GET_ACTION_REQUEST_SUCCESS
} from "../../constants/post.ActionTypes";

const postActionRequestStarted = (postData) => ({
  type: POST_ACTION_REQUEST_STARTED,
  payload: postData
});

const postActionRequestSuccess = (post) => ({
  type: POST_ACTION_REQUEST_SUCCESS,
  payload: post
});

const postActionRequestFailed = (error) => ({
  type: POST_ACTION_REQUEST_FAILED,
  payload: error
});

const postActionUpdateData = () => ({
  type: POST_ACTION_UPDATE_DATA,
});

const getActionRequestStarted = (url) => ({
  type: GET_ACTION_REQUEST_STARTED,
  payload: url,
});

const getActionRequestSuccess = (data) => ({
  type: GET_ACTION_REQUEST_SUCCESS,
  payload: data,
});

const getActionRequestFailed = (error) => ({
  type: GET_ACTION_REQUEST_FAILED,
  payload: error,
});

export {
  postActionRequestStarted,
  postActionRequestSuccess,
  postActionUpdateData,
  postActionRequestFailed,
  getActionRequestStarted,
  getActionRequestSuccess,
  getActionRequestFailed
};
