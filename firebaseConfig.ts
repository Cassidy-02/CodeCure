import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxI3rQKzo91wf3LwEobE2Hgh6JiEoEUbw",
    authDomain: "curecode-c3e19.firebaseapp.com",
    projectId: "curecode-c3e19",
    storageBucket: "curecode-c3e19.appspot.com",
    messagingSenderId: "462564042644",
    appId: "1:462564042644:web:da9f88d4f61d9973361181"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication and firestore services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
