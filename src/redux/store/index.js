import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/AuthSlice'

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;