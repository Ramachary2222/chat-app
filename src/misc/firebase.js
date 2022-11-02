import firebase from 'firebase/app';

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