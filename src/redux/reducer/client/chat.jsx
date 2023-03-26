import {
  ADD_CHAT_REQUEST,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAIL,
  ADD_CHAT_RESET,
  CLEAR_ERRORS,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
} from "../../type/client/chat";

export const chatReducer = (
  state = {
    chat: {},
  },
  action
) => {
  switch (action.type) {
    case GET_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CHAT_REQUEST:
      return {
        ...state,
        chatLoading: true,
      };
    case ADD_CHAT_SUCCESS:
      return {
        ...state,
        chatLoading: false,
        success: true,
        // chat: {
        //   ...state.chat,
        //   messages: [...state.chat.messages, { ...action.payload }],
        // },
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: { ...action.payload },
      };
    case ADD_CHAT_FAIL:
      return {
        ...state,
        chatLoading: false,
        success: false,
        chatError: action.payload,
      };
    case GET_CHAT_FAIL:
      return {
        chat: {},
        loading: false,
        error: action.payload,
      };
    case ADD_CHAT_RESET:
      return {
        ...state,
        success: false,
        chatDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        chatError: null,
      };

    default:
      return state;
  }
};
