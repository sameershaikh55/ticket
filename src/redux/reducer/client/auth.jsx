import {
  CLEAR_ERRORS,
  C_LOAD_USER_FAIL,
  C_LOAD_USER_REQUEST,
  C_LOAD_USER_SUCCESS,
  C_LOGIN_FAIL,
  C_LOGIN_REQUEST,
  C_LOGIN_SUCCESS,
  C_LOGOUT_FAIL,
  C_LOGOUT_SUCCESS,
} from "../../type/client/auth";

export const userClientReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case C_LOGIN_REQUEST:
    case C_LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case C_LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case C_LOGIN_SUCCESS:
    case C_LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case C_LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case C_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case C_LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case C_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
