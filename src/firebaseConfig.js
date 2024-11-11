
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfSRaWpZrOwbQBwvhbUIaPzdEIiMcAKF4",
  authDomain: "cooknook-e2425.firebaseapp.com",
  projectId: "cooknook-e2425",
  storageBucket: "cooknook-e2425.firebasestorage.app",
  messagingSenderId: "425161160245",
  appId: "1:425161160245:web:441ed7209c27eb99f4637c",
  measurementId: "G-5N0TBNF4HW"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

