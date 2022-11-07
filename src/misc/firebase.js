import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBgsSqQ3RK9BPJe4oqz2HPTToXnYbdH3_4",
    authDomain: "chat-web-app-3cedc.firebaseapp.com",
    databaseURL: "https://chat-web-app-3cedc-default-rtdb.firebaseio.com",
    projectId: "chat-web-app-3cedc",
    storageBucket: "chat-web-app-3cedc.appspot.com",
    messagingSenderId: "486439423645",
    appId: "1:486439423645:web:e6df9b7f425a6a226ace74"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();