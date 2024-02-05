import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAB1pvbuHi3jXzXgEYe_hTff-OBw9nNhU",
  authDomain: "devoro-412709.firebaseapp.com",
  projectId: "devoro-412709",
  storageBucket: "devoro-412709.appspot.com",
  messagingSenderId: "659036096981",
  appId: "1:659036096981:web:5c09f19d9b346222e2955c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export default app;
export { db, storage, auth};
