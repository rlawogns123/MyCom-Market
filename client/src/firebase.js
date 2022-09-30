import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6FbJb5QvSyOdalp-bvcmWDf3qXGWZMnY',
  authDomain: 'mycom-market-c3c43.firebaseapp.com',
  projectId: 'mycom-market-c3c43',
  storageBucket: 'mycom-market-c3c43.appspot.com',
  messagingSenderId: '789218737948',
  appId: '1:789218737948:web:f32b8b03cc676ba7a344d9',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
