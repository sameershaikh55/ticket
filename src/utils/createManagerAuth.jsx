import {
  createUserWithEmailAndPassword,
  //   updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export async function signUpWithEmailPasswordAndRole({ email, password }) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Return user information
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error) {
    throw error;
  }
}
