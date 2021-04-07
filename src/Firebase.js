import firebase from 'firebase/app'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCqxxlbz7BNLE6_0m6q9i68asxVI-vUpzg",
  authDomain: "madtube-cf168.firebaseapp.com",
  projectId: "madtube-cf168",
  storageBucket: "madtube-cf168.appspot.com",
  messagingSenderId: "366475653367",
  appId: "1:366475653367:web:40b136b230f85173ed23f2",
  measurementId: "G-180CRY40HB"
};

firebase.initializeApp(firebaseConfig)
export default firebase.auth()