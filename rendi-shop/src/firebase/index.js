import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// REACT_APP_apiKey= "AIzaSyAuwhkC-P-5lGWdoM9d4VVM3hjHhFzSIxg",
// REACT_APP_authDomain= "tb-majujaya.firebaseapp.com",
// REACT_APP_databaseURL="https://tb-majujaya.firebaseio.com",
// REACT_APP_projectId= "tb-majujaya",
// REACT_APP_storageBucket= "tb-majujaya.appspot.com",
// REACT_APP_messagingSenderId= "991601246779",
// REACT_APP_appId="1:991601246779:web:b3063ecaacdf556a20d21e",

firebase.initializeApp({
    apiKey: "AIzaSyAuwhkC-P-5lGWdoM9d4VVM3hjHhFzSIxg",
    authDomain: "tb-majujaya.firebaseapp.com",
    databaseURL: "https://tb-majujaya.firebaseio.com",
    projectId: "tb-majujaya",
    storageBucket: "tb-majujaya.appspot.com",
    messagingSenderId: "991601246779",
    appId: "1:991601246779:web:b3063ecaacdf556a20d21e",
  });

let db = firebase.firestore()


export default {
  firebase, db
}