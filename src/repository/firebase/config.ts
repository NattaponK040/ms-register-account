import  firebase from 'firebase-admin';
import 'firebase/storage';
import 'firebase/firestore';
//
const credentials = require("../../../auth-server.json");
//
firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    databaseURL: "https://auth-server-316c3-default-rtdb.firebaseio.com",
});
//
// const db = firebase.firestore().collection("dev");
// const storage = firebase.storage();
// module.exports = {firebase, db, storage};
//
// const firebaseConfig = {
//     apiKey: "AIzaSyDW7pSr3ueaXWRIUqbLCqmkJe7TL1cINtw",
//     authDomain: "auth-server-316c3.firebaseapp.com",
//     databaseURL: "https://auth-server-316c3-default-rtdb.firebaseio.com",
//     projectId: "auth-server-316c3",
//     storageBucket: "auth-server-316c3.appspot.com",
//     messagingSenderId: "658218681822",
//     appId: "1:658218681822:web:5a12a9be5589ac7fcbc94f"
// };
//
// firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export {auth, firebase, storage,timestamp};
