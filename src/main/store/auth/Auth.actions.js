import * as types from './Auth.types';

export const actionLogin = (payload, history) => ({
  type: types.LOGIN,
  payload,
  history,
});

export const actionLoginError = (error) => ({
  type: types.LOGIN_ERROR,
  error,
});

export const actionLoginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const actionLogout = (history) => ({
  type: types.LOGOUT,
  history,
});

export const actionLogoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});
