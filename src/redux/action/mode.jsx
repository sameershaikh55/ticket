import { DARK, LIGHT } from "../type/mode";

export const dark = () => async (dispatch) => {
  dispatch({ type: DARK });
  localStorage.setItem("mode", "DARK");
};
export const light = () => async (dispatch) => {
  dispatch({ type: LIGHT });
  localStorage.setItem("mode", "LIGHT");
};
