import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// GOOGLE OAUTH
import { GoogleAuthProvider } from "firebase/auth";
//_____

const firebaseConfig = {
  apiKey: "AIzaSyDjtAdhF-O5rlUlxuv-1EwbxXo8R1x2wEM",
  authDomain: "binar-challage-ch9-fb8ad.firebaseapp.com",
  projectId: "binar-challage-ch9-fb8ad",
  storageBucket: "binar-challage-ch9-fb8ad.appspot.com",
  messagingSenderId: "192933696065",
  appId: "1:192933696065:web:3cf519516f5c86cc012cc0",
  measurementId: "G-538EV8YGMC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// GOOGLE OAUTH
export const provider = new GoogleAuthProvider(app)
//________

export default app