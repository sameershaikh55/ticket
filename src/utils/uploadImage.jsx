import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { currentDateTime } from "./currentDateTime";

export const uploadImage = ({
  file,
  fieldName,
  storageFolder,
  inputHandle,
  setInputHandle,
}) => {
  setInputHandle({
    ...inputHandle,
    [fieldName]: "loading...",
  });

  if (!file) {
    setInputHandle({
      ...inputHandle,
      [fieldName]: "file not found",
    });
    return;
  }

  const storageRef = ref(
    storage,
    `${storageFolder}/${file.name}---${currentDateTime()}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setInputHandle({
          ...inputHandle,
          [fieldName]: downloadURL,
        });
      });
    }
  );
};
