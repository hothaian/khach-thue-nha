import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs7EiDM3L4oa7PGbzsyfuvXKUD6e9AfMA",
  authDomain: "nha-tro-binh-an.firebaseapp.com",
  projectId: "nha-tro-binh-an",
  storageBucket: "nha-tro-binh-an.appspot.com",
  messagingSenderId: "878602265886",
  appId: "1:878602265886:web:5d7680d74838456795550f",
  measurementId: "G-GBQZENQQ3G",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
