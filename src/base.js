import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD1HLS3iggSPwWvNLw428-KCJJU_nU-bco",
    authDomain: "react-cahtbox-app.firebaseapp.com",
    databaseURL: "https://react-cahtbox-app.firebaseio.com"
})

const base = Rebase.createClass(firebase.database());

export {firebaseApp};

export default base;