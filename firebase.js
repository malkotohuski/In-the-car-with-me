import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { apiKey, appId, measurementId, messagingSenderId, storageBucket, projectId, authDomain } from '@env';

const firebaseConfig = {
    apiKey: apiKey, //use your own 
    authDomain: authDomain,  //use your own 
    projectId: projectId,  //use your own 
    storageBucket: storageBucket,  //use your own 
    messagingSenderId: messagingSenderId, //use own 
    appId: appId, //use your own 
    measurementId: measurementId  //use your own 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };