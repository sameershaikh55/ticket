import {
  CLEAR_ERRORS,
  C_LOGIN_FAIL,
  C_LOGIN_REQUEST,
  C_LOGIN_SUCCESS,
} from "../../type/client/auth";
import { auth, database } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: C_LOGIN_REQUEST });

    const q = collection(database, "manager");
    const querySnapshot = await getDocs(q);
    const managersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const isAuthentic = managersData.some(
      (content) => content.email === email && content.password === password
    );

    if (isAuthentic) {
      const { user } = await signInWithEmailAndPassword(
        auth,
        (email = "user@user.com"),
        (password = "user123")
      );
      dispatch({ type: C_LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: C_LOGIN_FAIL, payload: "USER-NOT-FOUND" });
    }
  } catch (error) {
    const errorCode = error.code.split("/");
    dispatch({ type: C_LOGIN_FAIL, payload: errorCode[1] });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
