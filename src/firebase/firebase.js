import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDF9wItqoqMqWT2uNRXOjuAIjcfqfAV0Eg",
    authDomain: "nutrired-cf271.firebaseapp.com",
    databaseURL: "https://nutrired-cf271.firebaseio.com",
    projectId: "nutrired-cf271",
    storageBucket: "nutrired-cf271.appspot.com",
    messagingSenderId: "584377680064"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
  const db = firebase.database();
  const auth = firebase.auth();

  {/** Aveces necesito usar estas const son basicamente lo mismo**/}
  const dbfb = firebase.database();
  const authfb = firebase.auth();
  var storage = firebase.storage();

  export {
    db,
    dbfb,
    auth,
    authfb,
    storage
  }
 
