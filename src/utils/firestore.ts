// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8RZZFKAbNx5G1L1kf5dteSTXbBXFgkOs",
  authDomain: "chat-quiz-website-8a483.firebaseapp.com",
  projectId: "chat-quiz-website-8a483",
  storageBucket: "chat-quiz-website-8a483.appspot.com",
  messagingSenderId: "583638170837",
  appId: "1:583638170837:web:cf5d6b36d313a9799b365c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);