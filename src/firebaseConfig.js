import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA2p7jUb302IfIkquFYlscE2tG9CqWQL9M",
  authDomain: "petmed-cc414.firebaseapp.com",
  projectId: "petmed-cc414",
  storageBucket: "petmed-cc414.appspot.com",
  messagingSenderId: "441812779934",
  appId: "1:441812779934:web:9fd9bd00068dab604fcc8f"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }