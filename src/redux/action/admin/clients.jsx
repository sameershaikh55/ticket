import {
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  CLEAR_ERRORS,
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
} from "../../type/admin/clients";
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

const collectionName = "client";

// Register Client
export const registerClient = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CLIENT_REQUEST });
    console.log(data);

    const docRef = await addDoc(collection(database, collectionName), data);
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: ADD_CLIENT_SUCCESS,
      payload: addedData,
    });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_FAIL,
      payload: error.message,
    });
  }
};

// Get Client
export const getClient = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLIENT_REQUEST });

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
      type: GET_CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_CLIENT_FAIL, payload: error.message });
  }
};

// Delete Client
export const deleteClient = (id, url) => async (dispatch) => {
  try {
    await deleteDoc(doc(database, collectionName, id));
    deleteFileFromUrl(url);

    dispatch({
      type: DELETE_CLIENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CLIENT_FAIL,
      payload: error.message,
    });
  }
};

// Update Client
export const updateClient = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CLIENT_REQUEST });

    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updatedData);
    const docSnapshot = await getDoc(docRef);
    const afterUpdate = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
      payload: afterUpdate,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CLIENT_FAIL,
      payload: error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
