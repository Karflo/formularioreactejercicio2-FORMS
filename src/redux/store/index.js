import {createStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import reducers from "../reducers/reducer";
import storage from 'redux-persist/lib/storage'


const configureStore = ({initialState = {}, cache = false}) => {
    const persistConfig = {
        key: 'root',
        storage: storage,
    }

    const persistedReducers = persistReducer(persistConfig, reducers);

    let store = createStore(
        persistedReducers,
        initialState
    )

    return store;

}

export default configureStore;