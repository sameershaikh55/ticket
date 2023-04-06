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
  where,
} from "firebase/firestore";
import { deleteFileFromUrl } from "../../../utils/deleteImagefromStorage";
import { sendEmail } from "../../../utils/emailSender";
import { getDateTime } from "../../../utils/getDateTime";

const collectionName = "ticket";

// Register Ticket
export const registerTicket = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TICKET_REQUEST });

    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = JSON.parse(localStorage.getItem("user"));

    const docRef = await addDoc(
      collection(database, collectionName),
      ticketData
    );
    const docSnapshot = await getDoc(docRef);
    const addedData = { id: docSnapshot.id, ...docSnapshot.data() };

    const chat = {
      ticket: docSnapshot.id,
      messages: [],
    };
    await addDoc(collection(database, "chat"), chat);

    sendEmail(
      {
        email_title: user.name,
        priority: ticketData.priority,
        type: ticketData.type,
        problem: ticketData.problem,
        screenshot: ticketData.screenshot,
        explanation: ticketData.explanation,
        createdAt: getDateTime(ticketData.createdAt),
        to_email: [auth.email, "ticket@faktor22.nl"],
        name: auth.name,
        userPicture: auth.picture,
        ticketLink: `${window.location.origin}/ticket/${docSnapshot.id}`,
      },
      "template_xlpg09n"
    );
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

    const user = JSON.parse(localStorage.getItem("user"));

    const filteredData = data.filter((content) => content.client === user.id);

    dispatch({
      type: GET_TICKET_SUCCESS,
      payload: filteredData,
    });
  } catch (error) {
    dispatch({ type: GET_TICKET_FAIL, payload: error.message });
  }
};

// Delete Ticket
export const deleteTicket = (id, url) => async (dispatch) => {
  try {
    const chatQuerySnapshot = await getDocs(
      query(collection(database, "chat"), where("ticket", "==", id))
    );
    chatQuerySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

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

    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = JSON.parse(localStorage.getItem("user"));

    const docRef = doc(database, collectionName, id);
    const beforeUpdatedDoc = await getDoc(docRef); // fetch the updated document
    await updateDoc(docRef, updatedData);

    const updatedDoc = await getDoc(docRef); // fetch the updated document
    const updatedDocData = { id: updatedDoc.id, ...updatedDoc.data() }; // fetch the updated document

    if ("status" in updatedData) {
      sendEmail(
        {
          email_title: user.name,
          createdAt: getDateTime(updatedDocData.createdAt),
          to_email: [auth.email, "ticket@faktor22.nl"],
          name: auth.name,
          userPicture: auth.picture,
          previous_status: beforeUpdatedDoc.data().status.toUpperCase(),
          current_status: updatedDocData.status.toUpperCase(),
          ticketLink: `${window.location.origin}/ticket/${updatedDoc.id}`,
        },
        "template_t9ar56u"
      );
    }

    dispatch({
      type: UPDATE_TICKET_SUCCESS,
      payload: updatedDocData,
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
