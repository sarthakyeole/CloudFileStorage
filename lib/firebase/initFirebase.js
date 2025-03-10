// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const clientCredentials = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

    apiKey: "AIzaSyAsUBY1mmHMQuvecWpO0wERwhqyzlQQ3QY",
    authDomain: "cloud-file-storage-929bf.firebaseapp.com",
    databaseURL: "https://cloud-file-storage-929bf-default-rtdb.firebaseio.com",
    projectId: "cloud-file-storage-929bf",
    storageBucket: "cloud-file-storage-929bf.firebasestorage.app",
    messagingSenderId: "1047330393836",
    appId: "1:1047330393836:web:677f900b800235d6995fc9",
    measurementId: "G-BBWBF2D9K1"
};


function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(clientCredentials);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(clientCredentials);

const db = getFirestore(app);

const realDB = getDatabase(app);

export { initFirebase, db, realDB };