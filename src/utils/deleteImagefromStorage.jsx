import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

// DELETE IMAGES
export function deleteFileFromUrl(url) {
  const match = url.match(/\/o\/(.+)\?alt=media&token=(.+)/);
  if (!match || match.length !== 3) {
    console.error("Invalid URL format");
    return;
  }
  const filePath = decodeURIComponent(match[1]);
  const downloadToken = match[2];

  const fileRef = ref(storage, filePath);
  deleteObject(fileRef)
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting file:", error);
    });
}
