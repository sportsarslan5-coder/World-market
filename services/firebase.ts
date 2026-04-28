import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with settings for better reliability in some environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Often helps with 'unavailable' errors in sandboxed environments
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Connection test helper
export const validateConnection = async () => {
  try {
    // Attempt to fetch a non-existent doc from server to verify connection
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase connection failed: Client appears to be offline. Check configuration.");
    } else {
      console.warn("Firebase connection test performed (expected error if doc missing, but connection is alive):", error);
    }
  }
};
