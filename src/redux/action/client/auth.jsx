import {
  CLEAR_ERRORS,
  C_LOGIN_FAIL,
  C_LOGIN_REQUEST,
  C_LOGIN_SUCCESS,
} from "../../type/client/auth";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getCollection } from "../../../utils/getCollection";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: C_LOGIN_REQUEST });

    const managersData = await getCollection("manager");
    const teamData = await getCollection("team");

    const isAuthentic = [...managersData, ...teamData].filter(
      (content) => content.email === email && content.password === password
    );

    if (isAuthentic.length) {
      const managersData2 = await getCollection("client");

      const clientData = managersData2.filter(
        (content) => content.id === isAuthentic[0].client
      );

      if (!clientData.length) {
        let clientDataTeam = managersData2.filter((content) =>
          isAuthentic[0].projects.includes(content.name)
        );

        localStorage.setItem("user", JSON.stringify(clientDataTeam[0]));
      } else {
        localStorage.setItem("user", JSON.stringify(clientData[0]));
      }

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
    dispatch({ type: C_LOGIN_FAIL, payload: error });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
