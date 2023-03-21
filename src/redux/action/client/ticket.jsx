import {
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  CLEAR_ERRORS,
  GET_TICKET_REQUEST,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  GET_SINGLE_TICKET_REQUEST,
  GET_SINGLE_TICKET_SUCCESS,
  GET_SINGLE_TICKET_FAIL,
} from "../../type/client/ticket";
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
import { deleteFileFromUrl } from "../../../utils/deleteImagefromStorage";

const collectionName = "ticket";

// Register Ticket
export const registerTicket = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TICKET_REQUEST });

    const docRef = await addDoc(
      collection(database, collectionName),
      ticketData
    );
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: ADD_TICKET_SUCCESS,
      payload: addedData,
    });
  } catch (error) {
    dispatch({
      type: ADD_TICKET_FAIL,
      payload: error.message,
    });
  }
};

// Get single Ticket
export const getSingleTicket = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TICKET_REQUEST });

    const q = collection(database, collectionName);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredData = data.filter((content) => content.id === id);

    dispatch({
      type: GET_SINGLE_TICKET_SUCCESS,
      payload: filteredData[0],
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Ticket
export const getTicket = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TICKET_REQUEST });

    const q = query(
      collection(database, collectionName),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: GET_TICKET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_TICKET_FAIL, payload: error.message });
  }
};

// Delete Ticket
export const deleteTicket = (id, url) => async (dispatch) => {
  try {
    await deleteDoc(doc(database, collectionName, id));
    deleteFileFromUrl(url);

    dispatch({
      type: DELETE_TICKET_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TICKET_FAIL,
      payload: error.message,
    });
  }
};

// Update Ticket

export const updateTicket = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TICKET_REQUEST });

    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updatedData);

    const updatedDoc = await getDoc(docRef); // fetch the updated document

    dispatch({
      type: UPDATE_TICKET_SUCCESS,
      payload: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TICKET_FAIL,
      payload: error.message,
    });
  }
};

// Clearing Ticket
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
