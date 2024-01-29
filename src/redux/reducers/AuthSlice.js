import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:5000';
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredential) => {
      const request = await axios.post(`${BASE_URL}/auth/login`, userCredential)
      const response = await request.data;
      localStorage.setItem('user', JSON.stringify(response));
      console.log(localStorage.getItem('user'));
      console.log(request);

      return response;
  }
);

const userSlice = createSlice({ 
  name: 'user',
  initialState:{
    loading: false,
    error: null,
    user: null
  },
  extraReducers:(builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      console.log(action.error.message);
      if(action.error.message === 'Request failed with status code 401'){
        state.error = 'Access Denied! Invalid Credentials';
      }else{
        state.error = action.error.message;

      }
    })
  }
});

export default userSlice.reducer;