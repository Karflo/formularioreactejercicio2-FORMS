import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistReducer from 'redux-persist/es/persistReducer';
import reducers from '../reducers';
import storage from 'redux-persist/es/storage';
import rootSaga from '../saga/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const storeConfigure = ({ initialState = {}, cache = false }) => {
  const persistConfig = {
    key: 'root',
    storage: storage,
  };

  const persistedReducers = persistReducer(persistConfig, reducers);

  const store = createStore(
    persistedReducers,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeConfigure;
