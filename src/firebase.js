import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAikmjWYADWwaOeFUdBmapFnMwJFTBEFtQ",
  authDomain: "auth-dev-aff86.firebaseapp.com",
  projectId: "auth-dev-aff86",
  storageBucket: "auth-dev-aff86.appspot.com",
  messagingSenderId: "178947686629",
  appId: "1:178947686629:web:c4f2122238607be593d40c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app