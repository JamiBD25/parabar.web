import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABZiPRj263_VDL_aAcw861s3Jz_Ki8PcQ",
  authDomain: "glossy-guide-rms1d.firebaseapp.com",
  projectId: "glossy-guide-rms1d",
  storageBucket: "glossy-guide-rms1d.firebasestorage.app",
  messagingSenderId: "824348051994",
  appId: "1:824348051994:web:ab8a4efc2bc1953e565fa3"
};

const app = initializeApp(firebaseConfig);

// Since we have a custom firestore database ID from our config, 
// we initialize Firestore with that specific database ID as the third parameter.
export const db = initializeFirestore(app, {}, "ai-studio-2af76cb9-7a58-4ecc-8fed-02ec8832d834");
