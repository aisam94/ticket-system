// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgdBVDl7kuoQF-Ovtk2jMIKCDzlhckSz8",
  authDomain: "ticket-system-dea1a.firebaseapp.com",
  projectId: "ticket-system-dea1a",
  storageBucket: "ticket-system-dea1a.appspot.com",
  messagingSenderId: "409155973048",
  appId: "1:409155973048:web:35c3ae2dabb3fa30fee94d",
  measurementId: "G-DKP27E3XJD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
