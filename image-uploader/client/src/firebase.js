import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVNBk_YG_O9z0Qz5yamGmWygXpIFn0Uu4",
  authDomain: "imageuploader-10f7e.firebaseapp.com",
  databaseURL: "https://imageuploader-10f7e-default-rtdb.firebaseio.com",
  projectId: "imageuploader-10f7e",
  storageBucket: "imageuploader-10f7e.firebasestorage.app",
  messagingSenderId: "1080137793015",
  appId: "1:1080137793015:web:2bab0891ece0ae3f8582f2",
  measurementId: "G-CHD67372LQ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
