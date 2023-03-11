import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXvi2cdDCPFul7rp4g9rAcAQOpXOV5_WE",
  authDomain: "sourav-chat-gpt.firebaseapp.com",
  projectId: "sourav-chat-gpt",
  storageBucket: "sourav-chat-gpt.appspot.com",
  messagingSenderId: "17711140770",
  appId: "1:17711140770:web:086fd73fb93b639c0b2cfb"
};

//Initialise Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};