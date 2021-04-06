import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './Auth.actions';
import * as types from './Auth.types';
import { postAuth } from '../../api/AuthService';
import * as authSelectors from './Auth.selectors';
import store from '../Main';

export function* fetchLogin(data) {
  try {
    const response = yield postAuth(data.payload);
    yield put(actions.actionLoginSuccess(response.data));
    localStorage.setItem('token', authSelectors.token(store.getState()));
    if (data?.history) {
      data.history.push('/dashboard');
    }
  } catch (err) {
    yield put(actions.actionLoginError(err));
  }
}

export function* logout(data) {
  localStorage.removeItem('token');
  if (data?.history) {
    data.history.push('/login');
    yield put(actions.actionLogoutSuccess());
  }
}

export function* AuthSagas() {
  yield takeLatest(types.LOGIN, fetchLogin);
  yield takeLatest(types.LOGOUT, logout);
}
