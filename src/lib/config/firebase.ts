// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoYvXGc3Oz5bj1lDyTBNDPgq8TZ0UERkE",
  authDomain: "bcqs-72b21.firebaseapp.com",
  projectId: "bcqs-72b21",
  storageBucket: "bcqs-72b21.appspot.com",
  messagingSenderId: "117322102182",
  appId: "1:117322102182:web:ea83d1a2a9dd4a1d3b4b67",
  measurementId: "G-TE94SVK7GH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);
