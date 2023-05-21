import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCGAxNlreczu8fe0HeVE7YTJngrIbmyjEA",
    authDomain: "chat-5abdf.firebaseapp.com",
    projectId: "chat-5abdf",
    storageBucket: "chat-5abdf.appspot.com",
    messagingSenderId: "879419771679",
    appId: "1:879419771679:web:2941f03a6821ce245dfe2a"

  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth()
  export const storage = getStorage();
  export const db = getFirestore();


  /* apiKey: "AIzaSyB9_dmZssd9WFcnnlpfbmpRiLh7hiZEptQ",
  authDomain: "finaltry-7a7d3.firebaseapp.com",
  projectId: "finaltry-7a7d3",
  storageBucket: "finaltry-7a7d3.appspot.com",
  messagingSenderId: "208225002353",
  appId: "1:208225002353:web:c1fbf91be944b191e78cd0",
  measurementId: "G-RPDQ5XELES"*/