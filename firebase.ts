import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kanye-tweet.firebaseapp.com",
  projectId: "kanye-tweet",
  storageBucket: "kanye-tweet.firebasestorage.app",
  messagingSenderId: "539528292452",
  appId: "1:539528292452:web:19d389d65edef9d9439771"
};

// Add console logging to debug environment variables
if (!firebaseConfig.projectId) {
  throw new Error('Firebase Project ID is not defined in configuration');
}

try {
  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  
  // Initialize Firestore
  const db = getFirestore(app);
  
  console.log('Firebase initialized successfully with project:', firebaseConfig.projectId);
  
  export { app, db };
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
} 