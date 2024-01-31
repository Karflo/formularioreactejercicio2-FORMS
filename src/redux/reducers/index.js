//Indexar todos los reducers en uno teniendo en archivos diferentes cada uno
import { combineReducers } from "@reduxjs/toolkit";
import AuthReducers from "./AuthReducers";

const reducers = combineReducers({ //Sirvo para juntar los reducers usando los states
    authState: AuthReducers
})

export default reducers;