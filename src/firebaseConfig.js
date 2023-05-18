/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-wA3fDMQhrHpgNSnoSzn6Z35IfSH36DA",
  authDomain: "build-with-me-100fc.firebaseapp.com",
  projectId: "build-with-me-100fc",
  storageBucket: "build-with-me-100fc.appspot.com",
  messagingSenderId: "59835086126",
  appId: "1:59835086126:web:5027bc05732df0e53c36bf",
  measurementId: "G-1JX5M88BN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };