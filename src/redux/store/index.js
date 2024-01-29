import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/AuthSlice'



//Configuro y creo el store usando la biblioteca pertinente.
//Esto servirá para manejar el estado relacionado con el usuario
const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;