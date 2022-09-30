import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAMQXH3KvxCDhhBvp1lGluyrkBGDyaN74k',
  authDomain: 'mycom-market.firebaseapp.com',
  projectId: 'mycom-market',
  storageBucket: 'mycom-market.appspot.com',
  messagingSenderId: '1074072342562',
  appId: '1:1074072342562:web:b9d3e46d0ab28ea28afa7b',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
