import * as firebase from 'firebase';
  const config = {
    apiKey: "AIzaSyB_WyP2sJy8jY54CJfHyoqKtUQexYr3tD8",
    authDomain: "messageboard-47900.firebaseapp.com",
    databaseURL: "https://messageboard-47900.firebaseio.com",
    projectId: "messageboard-47900",
    storageBucket: "messageboard-47900.appspot.com",
    messagingSenderId: "47336789230"
  };
  firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const docDB = firebase.database().ref('docs/');
export const auth = firebase.auth();
export const profile = firebase.database().ref('profile/');