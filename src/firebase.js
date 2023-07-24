// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAIeQDN1kKoiIavwdASZQq85uy3SFuTwfQ",
    authDomain: "ecommerce-23dd7.firebaseapp.com",
    projectId: "ecommerce-23dd7",
    storageBucket: "ecommerce-23dd7.appspot.com",
    messagingSenderId: "311071102309",
    appId: "1:311071102309:web:3808718af9c870d3453d8c",
    measurementId: "G-ED95EZ0CRY"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
