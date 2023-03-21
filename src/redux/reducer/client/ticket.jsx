import {
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  ADD_TICKET_RESET,
  CLEAR_ERRORS,
  GET_TICKET_REQUEST,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_RESET,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  UPDATE_TICKET_RESET,
  GET_SINGLE_TICKET_FAIL,
  GET_SINGLE_TICKET_REQUEST,
  GET_SINGLE_TICKET_SUCCESS,
} from "../../type/client/ticket";

export const ticketReducer = (
  state = {
    singleTicket: {},
    ticket: [],
  },
  action
) => {
  switch (action.type) {
    case GET_TICKET_REQUEST:
    case GET_SINGLE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TICKET_REQUEST:
    case UPDATE_TICKET_REQUEST:
      return {
        ...state,
        ticketLoading: true,
      };
    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        ticketLoading: false,
        success: true,
        ticket: [action.payload, ...state.ticket],
      };
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        ticketLoading: false,
        success: true,
        ticket: state.ticket.map((content) =>
          content.id === action.payload.id
            ? (content = action.payload)
            : content
        ),
        singleTicket:
          (state.singleTicket.id === action.payload.id && action.payload) ||
          state.singleTicket,
      };
    case GET_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.payload,
      };
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        ticketDeleted: true,
        ticket: state.ticket.filter(({ id }) => id !== action.payload),
      };
    case GET_SINGLE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        singleTicket: action.payload,
      };
    case ADD_TICKET_FAIL:
    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        ticketLoading: false,
        success: false,
        ticketError: action.payload,
      };
    case DELETE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_TICKET_FAIL:
      return {
        ticket: [],
        loading: false,
        error: action.payload,
      };
    case GET_SINGLE_TICKET_FAIL:
      return {
        singleTicket: {},
        loading: false,
        error: action.payload,
      };
    case ADD_TICKET_RESET:
    case DELETE_TICKET_RESET:
    case UPDATE_TICKET_RESET:
      return {
        ...state,
        success: false,
        ticketDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        ticketError: null,
      };

    default:
      return state;
  }
};
