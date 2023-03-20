import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../../type/admin/auth";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { C_LOAD_USER_FAIL, C_LOAD_USER_SUCCESS } from "../../type/client/auth";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    const errorCode = error.code.split("/");
    dispatch({ type: LOGIN_FAIL, payload: errorCode[1] });
  }
};

// Loader user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  auth.onAuthStateChanged(
    (user) => {
      if (user && user.email === "admin@admin.com") {
        dispatch({ type: LOAD_USER_SUCCESS, payload: user });
        dispatch({ type: C_LOAD_USER_FAIL });
      } else if (user && user.email === "user@user.com") {
        dispatch({ type: C_LOAD_USER_SUCCESS, payload: user });
        dispatch({ type: LOAD_USER_FAIL });
      } else {
        dispatch({ type: LOAD_USER_FAIL });
        dispatch({ type: C_LOAD_USER_FAIL });
      }
    },
    (error) => {
      const errorCode = error.code.split("/");
      dispatch({ type: LOAD_USER_FAIL, payload: errorCode[1] });
    }
  );
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await auth.signOut(); // sign out the current user
    dispatch({ type: LOGOUT_SUCCESS });

    if (localStorage.getItem("user")) {
      // User variable exists in localStorage, so remove it
      localStorage.removeItem("user");
    }
  } catch (error) {
    const errorCode = error.code.split("/");
    dispatch({ type: LOGOUT_FAIL, payload: errorCode[1] });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
