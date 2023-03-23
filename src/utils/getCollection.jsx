import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

export const getCollection = async (collectionName) => {
  const q = collection(database, collectionName);
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};
