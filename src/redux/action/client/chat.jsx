import {
  ADD_CHAT_REQUEST,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAIL,
  CLEAR_ERRORS,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
} from "../../type/client/chat";
import { database } from "../../../firebase";
import {
  collection,
  doc,
  query,
  updateDoc,
  arrayUnion,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

const collectionName = "chat";

// Get Chat
export const getChat = (ticketId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });

    const q = query(
      collection(database, collectionName),
      where("ticket", "==", ticketId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({
        type: GET_CHAT_SUCCESS,
        payload: data[0],
      });
    });

    return () => unsubscribe();
  } catch (error) {
    dispatch({ type: GET_CHAT_FAIL, payload: error.message });
  }
};

// Register Chat
export const addMessage = (messageData, id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CHAT_REQUEST });

    const docRef = doc(database, collectionName, id);

    await updateDoc(docRef, {
      messages: arrayUnion(messageData),
    });

    dispatch({
      type: ADD_CHAT_SUCCESS,
      payload: messageData,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHAT_FAIL,
      payload: error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
