import {
  ADD_MANAGER_REQUEST,
  ADD_MANAGER_SUCCESS,
  ADD_MANAGER_FAIL,
  CLEAR_ERRORS,
  GET_MANAGER_REQUEST,
  GET_MANAGER_SUCCESS,
  GET_MANAGER_FAIL,
  DELETE_MANAGER_FAIL,
  DELETE_MANAGER_SUCCESS,
  UPDATE_MANAGER_REQUEST,
  UPDATE_MANAGER_SUCCESS,
  UPDATE_MANAGER_FAIL,
} from "../../type/admin/managers";
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

const collectionName = "manager";

// Register Manager
export const registerManager = (managerData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MANAGER_REQUEST });

    const docRef = await addDoc(
      collection(database, collectionName),
      managerData
    );
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: ADD_MANAGER_SUCCESS,
      payload: addedData,
    });
  } catch (error) {
    dispatch({
      type: ADD_MANAGER_FAIL,
      payload: error.message,
    });
  }
};

// Get Manager
export const getManager = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MANAGER_REQUEST });

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
      type: GET_MANAGER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_MANAGER_FAIL, payload: error.message });
  }
};

// Delete Manager
export const deleteManager = (id, url) => async (dispatch) => {
  try {
    await deleteDoc(doc(database, collectionName, id));
    deleteFileFromUrl(url);

    dispatch({
      type: DELETE_MANAGER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MANAGER_FAIL,
      payload: error.message,
    });
  }
};

// Update Manager
export const updateManager = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MANAGER_REQUEST });

    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updatedData);

    dispatch({
      type: UPDATE_MANAGER_SUCCESS,
      payload: { id: id, ...updatedData },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MANAGER_FAIL,
      payload: error.message,
    });
  }
};

// Clearing Manager
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
