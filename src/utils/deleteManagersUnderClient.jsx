import { database } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

export const deleteManagersUnderClient = ({
  collectionName,
  fieldName,
  fieldValue,
}) => {
  const collectionRef = collection(database, collectionName);
  const q = query(collectionRef, where(fieldName, "==", fieldValue));

  getDocs(q)
    .then((querySnapshot) => {
      const batchWrite = writeBatch(database);
      querySnapshot.forEach((doc) => {
        batchWrite.delete(doc.ref);
      });
      return batchWrite.commit();
    })
    .then(() => {
      console.log("Batch delete succeeded.");
    })
    .catch((error) => {
      console.error("Error deleting documents: ", error);
    });
};
