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

    const isAuthentic = managersData.filter(
      (content) => content.email === email && content.password === password
    );

    if (isAuthentic.length) {
      const q2 = collection(database, "client");
      const querySnapshot2 = await getDocs(q2);
      const managersData2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const clientData = managersData2.filter(
        (content) => content.id === isAuthentic[0].client
      );
      localStorage.setItem("user", JSON.stringify(clientData[0]));
      localStorage.setItem("auth", JSON.stringify(isAuthentic[0]));

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
