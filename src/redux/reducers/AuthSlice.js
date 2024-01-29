import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localStorage from "redux-persist/es/storage";
const BASE_URL = 'http://127.0.0.1:5000';

//Con createAsycnThunk ayudamos a crear operaciones asíncronas dentro de redux
//Axios es una biblioteca para hacer solicitudes HTTP usando en este caso POST
//localStorage se usa para almacenar el token de usuario
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

export const checkStorage = createAsyncThunk(
  'user/checkStorage',
  () => {
      return JSON.parse(localStorage.getItem('user'))
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  () => {
    localStorage.removeItem('user');

    
  }
);


//userSlice sirve para crear un slice de Redux el cual incluye las acciones de su reducer
//Con initialState definimos el estado inicial del Slice
//Con extraReducers definimos las diferentes acciones 
//Con pending solamente lo usamos cuando la solicitud está en curso
//Con fulfilled solamente lo usamos cuando hemos tenido exito
const userSlice = createSlice({ 
  name: 'user',
  initialState:{
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false
  },
  extraReducers:(builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      console.log(action.error.message);
      if(action.error.message === 'Request failed with status code 401'){
        state.error = 'Access Denied! Invalid Credentials';
      }else{
        state.error = action.error.message;

      }
    })
    .addCase(checkStorage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      
    })
  }
});

//Este export dirve para que pueda ser usado en el archivo donde configuramos el Store de Redux
export default userSlice.reducer;