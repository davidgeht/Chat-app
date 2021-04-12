import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
firebase.initializeApp( {
    apiKey: "AIzaSyAXsSjL-0KEcde2c-dtB6gzMhGyG3P5di8",
    authDomain: "chat-app-22b94.firebaseapp.com",
    projectId: "chat-app-22b94",
    storageBucket: "chat-app-22b94.appspot.com",
    messagingSenderId: "18293006904",
    appId: "1:18293006904:web:903ebe244bf66a6c7c7ccd",
    measurementId: "G-LJSCWE0DV7"
  });
export const auth = firebase.auth()
export const firestore = firebase.firestore();

