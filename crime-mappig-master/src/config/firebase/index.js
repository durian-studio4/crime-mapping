import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import 'firebase/firestrore'


const firebaseConfig = {
    apiKey: "AIzaSyAG_lOyaMI6STcFfvnPT0xDd6KbIGoIwfM",
    authDomain: "crime-mapping-firebase.firebaseapp.com",
    databaseURL: "https://crime-mapping-firebase.firebaseio.com",
    projectId: "crime-mapping-firebase",
    storageBucket: "crime-mapping-firebase.appspot.com",
    messagingSenderId: "404375516706",
    appId: "1:404375516706:web:f175472d2300b8eaf6bc7b",
    measurementId: "G-GR89FWS6KQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
//firebase.analytics();

export default firebase;