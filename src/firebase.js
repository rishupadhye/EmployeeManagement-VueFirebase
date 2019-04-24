import firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyBIT5g_qcSmuV4bQyANo6V7vScWGMI8l8E",
    authDomain: "vfiretutorial.firebaseapp.com",
    databaseURL: "https://vfiretutorial.firebaseio.com",
    projectId: "vfiretutorial",
    storageBucket: "vfiretutorial.appspot.com",
    messagingSenderId: "935605080256"
};

firebase.initializeApp(config);

const db= firebase.firestore();


export default db;