import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCzH4N5z0UV0uAAWsQWCufJ4gJ0KP29Yis",
    authDomain: "milk-budget.firebaseapp.com",
    databaseURL: "https://milk-budget.firebaseio.com",
    projectId: "milk-budget",
    storageBucket: "milk-budget.appspot.com",
    messagingSenderId: "231125635786",
    appId: "1:231125635786:web:880328a53215c33198da33",
    measurementId: "G-JZR786Y9DN"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;