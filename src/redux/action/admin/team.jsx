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
  GET_SINGLE_TEAM_FAIL,
  GET_SINGLE_TEAM_REQUEST,
  GET_SINGLE_TEAM_SUCCESS,
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
} from "firebase/firestore";

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

// GET SINGLE Member
export const getSingleTeam = (id) => async (dispatch) => {
  //   try {
  //     dispatch({ type: GET_SINGLE_TEAM_REQUEST });
  //     let { data } = await axios.get(`/api/property/${id}`);
  //     dispatch({
  //       type: GET_SINGLE_TEAM_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: GET_SINGLE_TEAM_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
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

// Get search Team
export const getSearchedProperties = (search, page) => async (dispatch) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/property${search || page ? "?" : ""}${
  //         (search && `search=${search}`) || ""
  //       }${(search && page && "&") || ""}${(page && `page=${page}`) || ""}`
  //     );
  //     dispatch({
  //       type: GET_TEAM_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: GET_TEAM_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
};

// Delete Team
export const deleteTeam = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(database, collectionName, id));

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
  //   try {
  //     dispatch({ type: UPDATE_TEAM_REQUEST });
  //     const { data } = await axios.put(`/api/property/${id}`, updatedData);
  //     dispatch({
  //       type: UPDATE_TEAM_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: UPDATE_TEAM_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
