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
import { auth, database } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const querySnapshot = await getDocs(collection(database, "admins"));
    const admins = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const isPresent = admins.some((admin) => admin.email === email);

    if (isPresent) {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: LOGIN_SUCCESS, payload: { email: user } });
    } else {
      dispatch({ type: LOGIN_FAIL, payload: "USER-NOT-FOUND" });
    }
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
      if (user) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: user });
      } else {
        dispatch({ type: LOAD_USER_FAIL });
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
  } catch (error) {
    const errorCode = error.code.split("/");
    dispatch({ type: LOGOUT_FAIL, payload: errorCode[1] });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
