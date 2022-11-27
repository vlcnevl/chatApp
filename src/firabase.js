import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB7wZC4h0W9mkmsLTORdlf61zN8pOmAvKs",
  authDomain: "chatapp-a75db.firebaseapp.com",
  projectId: "chatapp-a75db",
  storageBucket: "chatapp-a75db.appspot.com",
  messagingSenderId: "638156108127",
  appId: "1:638156108127:web:26cb8b800fb2f8c69346ea"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
