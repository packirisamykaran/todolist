import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANlGtjjJi8UknaOPqGsboSbzCFWw6cZVQ",
  authDomain: "todo-list-60243.firebaseapp.com",
  projectId: "todo-list-60243",
  storageBucket: "todo-list-60243.appspot.com",
  messagingSenderId: "367433853400",
  appId: "1:367433853400:web:1d9812c6b95049d2322aad",
  measurementId: "G-RXGSQCYYH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)