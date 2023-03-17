import {
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  ADD_CLIENT_RESET,
  CLEAR_ERRORS,
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_RESET,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_RESET,
} from "../../type/admin/clients";

export const clientReducer = (
  state = {
    clients: [],
  },
  action
) => {
  switch (action.type) {
    case GET_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CLIENT_REQUEST:
    case UPDATE_CLIENT_REQUEST:
      return {
        ...state,
        clientLoading: true,
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        success: true,
        clients: [action.payload, ...state.clients],
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        success: true,
        clients: state.clients.map((content) =>
          content.id === action.payload.id
            ? (content = action.payload)
            : content
        ),
      };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientDeleted: true,
        clients: state.clients.filter(({ id }) => id !== action.payload),
      };
    case ADD_CLIENT_FAIL:
    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
        clientLoading: false,
        success: false,
        clientError: action.payload,
      };
    case DELETE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_CLIENT_FAIL:
      return {
        clients: [],
        loading: false,
        error: action.payload,
      };
    case ADD_CLIENT_RESET:
    case DELETE_CLIENT_RESET:
    case UPDATE_CLIENT_RESET:
      return {
        ...state,
        success: false,
        clientDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        clientError: null,
      };

    default:
      return state;
  }
};
