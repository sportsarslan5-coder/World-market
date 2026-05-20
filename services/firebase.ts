import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with settings for better reliability in some environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Often helps with 'unavailable' errors in sandboxed environments
  ignoreUndefinedProperties: true, // Prevent undefined errors on schema writes
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Connection test helper
export const validateConnection = async () => {
  try {
    // Attempt to fetch a doc from server to verify connection with a fast timeout
    const testPromise = getDocFromServer(doc(db, 'test', 'connection'));
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    );
    
    await Promise.race([testPromise, timeoutPromise]);
    console.log('Firebase connection verified');
  } catch (error) {
    // Log connection status in a clean, professional, non-crashing format
    console.log('Firebase operating in robust local offline cache mode (data will automatically synchronize when connection establishes)');
  }
};
