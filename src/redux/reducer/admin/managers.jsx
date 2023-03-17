import {
  ADD_MANAGER_REQUEST,
  ADD_MANAGER_SUCCESS,
  ADD_MANAGER_FAIL,
  ADD_MANAGER_RESET,
  CLEAR_ERRORS,
  GET_MANAGER_REQUEST,
  GET_MANAGER_SUCCESS,
  GET_MANAGER_FAIL,
  DELETE_MANAGER_SUCCESS,
  DELETE_MANAGER_FAIL,
  DELETE_MANAGER_RESET,
  UPDATE_MANAGER_REQUEST,
  UPDATE_MANAGER_SUCCESS,
  UPDATE_MANAGER_FAIL,
  UPDATE_MANAGER_RESET,
} from "../../type/admin/managers";

export const managersReducer = (
  state = {
    managers: [],
  },
  action
) => {
  switch (action.type) {
    case GET_MANAGER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_MANAGER_REQUEST:
    case UPDATE_MANAGER_REQUEST:
      return {
        ...state,
        managerLoading: true,
      };
    case ADD_MANAGER_SUCCESS:
      return {
        ...state,
        managerLoading: false,
        success: true,
        managers: [action.payload, ...state.managers],
      };
    case UPDATE_MANAGER_SUCCESS:
      return {
        ...state,
        managerLoading: false,
        success: true,
        managers: state.managers.map((content) =>
          content.id === action.payload.id
            ? (content = action.payload)
            : content
        ),
      };
    case GET_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        managers: action.payload,
      };
    case DELETE_MANAGER_SUCCESS:
      return {
        ...state,
        managerDeleted: true,
        managers: state.managers.filter(({ id }) => id !== action.payload),
      };
    case ADD_MANAGER_FAIL:
    case UPDATE_MANAGER_FAIL:
      return {
        ...state,
        managerLoading: false,
        success: false,
        managerError: action.payload,
      };
    case DELETE_MANAGER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_MANAGER_FAIL:
      return {
        managers: [],
        loading: false,
        error: action.payload,
      };
    case ADD_MANAGER_RESET:
    case DELETE_MANAGER_RESET:
    case UPDATE_MANAGER_RESET:
      return {
        ...state,
        success: false,
        managerDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        managerError: null,
      };

    default:
      return state;
  }
};
