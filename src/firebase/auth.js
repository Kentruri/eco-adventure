import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const doCreateUserWithEmailAndPassword = async (email,password) => {
  return createUserWithEmailAndPassword(auth,email,password)
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth,provider)
  return result
}

export const doSignOut = () => {
  return auth.signOut()
}

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth,email)
}

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser,password)
}

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser,{
    url: `${window.location.origin}/home`
  })
}
