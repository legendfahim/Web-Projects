import firebase from 'firebase/compat/app';
import 'firebase/storage';
import firebaseConfig from '../firebaseConfig';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;