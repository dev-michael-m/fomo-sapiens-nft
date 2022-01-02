// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
require('dotenv').config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_AUTH,
  authDomain: "fomo-sapiens-nft.firebaseapp.com",
  projectId: "fomo-sapiens-nft",
  storageBucket: "fomo-sapiens-nft.appspot.com",
  messagingSenderId: "791960917946",
  appId: "1:791960917946:web:b526deed9f346879c9af83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;