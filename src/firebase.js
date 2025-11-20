import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCosXuvImmrN4HWopDw5kYXbkaniMEF2tM",
  authDomain: "stepappdemo-10403.firebaseapp.com",
  projectId: "stepappdemo-10403",
  storageBucket: "stepappdemo-10403.firebasestorage.app",
  messagingSenderId: "251835522262",
  appId: "1:251835522262:web:d4b1e5613c70742f28fd77"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
