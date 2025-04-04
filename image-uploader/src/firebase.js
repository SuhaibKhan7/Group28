import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDum2Jfcjr91ZpW3N5oiSvVT0RZB9L1_Lw",
  authDomain: "imagesup-57bcb.firebaseapp.com",
  projectId: "imagesup-57bcb",
  storageBucket: "imagesup-57bcb.firebasestorage.app",
  messagingSenderId: "735117912889",
  appId: "1:735117912889:web:5fce6ea144e55ce64116e8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
