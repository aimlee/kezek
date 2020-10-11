import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCZhIJzS6x2yClcffmhsxLFdgZULamyX2k",
    authDomain: "kezek-3bcd3.firebaseapp.com",
    databaseURL: "https://kezek-3bcd3.firebaseio.com",
    projectId: "kezek-3bcd3",
    storageBucket: "kezek-3bcd3.appspot.com",
    messagingSenderId: "85380882334",
    appId: "1:85380882334:web:46c1c9b1402517daeb008f",
    measurementId: "G-90RVZ7L9J9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
