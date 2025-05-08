
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyByXyZrHxBbgVXNVAJb7HS7VUpw1QUVnt4",
  authDomain: "busybuy-8425d.firebaseapp.com",
  projectId: "busybuy-8425d",
  storageBucket: "busybuy-8425d.firebasestorage.app",
  messagingSenderId: "374704041693",
  appId: "1:374704041693:web:1b0373ea2236e32d9db534"
};

const app = initializeApp(firebaseConfig);


console.log(process.env);

const db = getFirestore(app);
export const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
export { db };