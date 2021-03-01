import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDcyBVe8AEAkFdDD1CcV9fkw3OdR-6QrwA",
  authDomain: "legacy-project-22.firebaseapp.com",
  projectId: "legacy-project-22",
  storageBucket: "legacy-project-22.appspot.com",
  messagingSenderId: "1058355178054",
  appId: "1:1058355178054:web:391afaac0cfdf73a803847",
  measurementId: "G-D8TQWLG8CL"
};
///
firebase.initializeApp( firebaseConfig );
const storage = firebase.storage()
export { storage , firebase as default}