import {
  ADD_TEAM_REQUEST,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_FAIL,
  CLEAR_ERRORS,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  DELETE_TEAM_FAIL,
  DELETE_TEAM_SUCCESS,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAIL,
} from "../../type/admin/team";
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

const collectionName = "team";

// Register Team
export const registerTeam = (teamData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TEAM_REQUEST });

    const docRef = await addDoc(collection(database, collectionName), teamData);
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    dispatch({
      type: ADD_TEAM_SUCCESS,
      payload: addedData,
    });
  } catch (error) {
    dispatch({
      type: ADD_TEAM_FAIL,
      payload: error.message,
    });
  }
};

// Get Team
export const getTeam = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TEAM_REQUEST });

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
      type: GET_TEAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_TEAM_FAIL, payload: error.message });
  }
};

// Delete Team
export const deleteTeam = (id, url) => async (dispatch) => {
  try {
    await deleteDoc(doc(database, collectionName, id));
    deleteFileFromUrl(url);

    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAIL,
      payload: error.message,
    });
  }
};

// Update Team
export const updateTeam = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEAM_REQUEST });

    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updatedData);

    dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: { id: id, ...updatedData },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_FAIL,
      payload: error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
