// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD089VpaQDSZwkevCq8QEfRySsnMkSZhFw",
  authDomain: "user-service-c6ce3.firebaseapp.com",
  projectId: "user-service-c6ce3",
  storageBucket: "user-service-c6ce3.appspot.com",
  messagingSenderId: "583763675423",
  appId: "1:583763675423:web:0831d3068932a063b1c82a"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

