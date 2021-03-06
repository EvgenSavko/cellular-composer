import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxpppHU5Q6OuZqCHOx8zqm9lS0AXIm7-c",
  authDomain: "cellular-composer.firebaseapp.com",
  projectId: "cellular-composer",
  storageBucket: "cellular-composer.appspot.com",
  messagingSenderId: "353273701056",
  appId: "1:353273701056:web:e71abe114a14c8a1668325",
  measurementId: "G-PS3M1B7XLX",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
