import {
  POST_ACTION_REQUEST_STARTED,
  POST_ACTION_REQUEST_FAILED,
  POST_ACTION_REQUEST_SUCCESS,
  GET_ACTION_REQUEST_STARTED,  // Nueva acción para solicitudes GET
  GET_ACTION_REQUEST_FAILED,   // Nueva acción para solicitudes GET
  GET_ACTION_REQUEST_SUCCESS   // Nueva acción para solicitudes GET
} from "../../constants/post.ActionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const applyRequestGetStarted = (state, action) => ({
  ...state,
  loading: true,
  error: null,
  data: null,
});

const applyRequestStarted = (state, action) => ({
  ...state,
  loading: true,
  error: null,
  data: null,
});

const applyRequestFailed = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
  data: null,
});

const applyRequestSuccess = (state, action) => ({
  ...state,
  loading: false,
  error: null,
  data: action.payload,
});

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTION_REQUEST_STARTED:
      return applyRequestGetStarted(state, action);

    case POST_ACTION_REQUEST_STARTED:
      return applyRequestStarted(state, action);

    case GET_ACTION_REQUEST_FAILED:
    case POST_ACTION_REQUEST_FAILED:
      return applyRequestFailed(state, action);

    case GET_ACTION_REQUEST_SUCCESS:
    case POST_ACTION_REQUEST_SUCCESS:
      return applyRequestSuccess(state, action);

    default:
      return state;
  }
};

export default postReducer;
