import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import auth from './auth/Auth.reducers';
import { AuthSagas } from './auth/Auth.sagas';

const reducer = combineReducers({ auth });

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(AuthSagas)

export default store;

// render the application
