import * as types from './Auth.types';

const INITIAL_STATE = { user: null, error: null, isAuthenticated: false, loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        error: null,
        isAuthenticated: false,
        loading: true,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        isAuthenticated: false,
        loading: false,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action?.payload?.data || {},
        token: action?.payload?.data?.authToken || null,
        error: null,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
