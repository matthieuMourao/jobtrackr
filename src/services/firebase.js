import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_t0QTNw29ngU6hhgV6voZbAKB0-ktADA",
    authDomain: "jobtrackr-b2424.firebaseapp.com",
    projectId: "jobtrackr-b2424",
    storageBucket: "jobtrackr-b2424.firebasestorage.app",
    messagingSenderId: "956606050025",
    appId: "1:956606050025:web:3842cc2274f1313ea58a78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);