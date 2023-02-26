import { DARK, LIGHT } from "../type/mode";

export const modeReducer = (state = { mode: "dark" }, action) => {
  switch (action.type) {
    case DARK:
      return {
        mode: "dark",
      };
    case LIGHT:
      return {
        mode: "light",
      };
    default:
      return state;
  }
};
