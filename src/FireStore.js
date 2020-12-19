import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAOUoE-wr09NixDzN-yBtT41fFS89dNHvQ",
    authDomain: "mesrecettes-89f73.firebaseapp.com",
    databaseURL: "https://mesrecettes-89f73.firebaseio.com",
    projectId: "mesrecettes-89f73",
    storageBucket: "mesrecettes-89f73.appspot.com",
    messagingSenderId: "229652216642",
    appId: "1:229652216642:web:81c307d0b75a8167a926db",
    measurementId: "G-YCP2GZ72N6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase