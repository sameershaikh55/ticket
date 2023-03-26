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
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";

const collectionName = "chat";

// Get Chat
export const getChat = (ticketId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });

    const q = query(
      collection(database, collectionName),
      where("ticket", "==", ticketId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(data);

    dispatch({
      type: GET_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_CHAT_FAIL, payload: error.message });
  }
};

// Register Chat
export const registerChat = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CHAT_REQUEST });

    const docRef = await addDoc(
      collection(database, collectionName),
      ticketData
    );
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: ADD_CHAT_SUCCESS,
      payload: addedData,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHAT_FAIL,
      payload: error.message,
    });
  }
};
