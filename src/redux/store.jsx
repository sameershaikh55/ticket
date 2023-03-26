import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import { modeReducer } from "./reducer/mode";
import { userReducer } from "./reducer/admin/auth";
import { userClientReducer } from "./reducer/client/auth";
import { teamReducer } from "./reducer/admin/team";
import { clientReducer } from "./reducer/admin/clients";
import { managersReducer } from "./reducer/admin/managers";
import { ticketReducer } from "./reducer/client/ticket";
import { chatReducer } from "./reducer/client/chat";

const reducer = combineReducers({
  mode: modeReducer,
  adminUser: userReducer,
  clientUser: userClientReducer,
  team: teamReducer,
  client: clientReducer,
  manager: managersReducer,
  ticket: ticketReducer,
  chat: chatReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
