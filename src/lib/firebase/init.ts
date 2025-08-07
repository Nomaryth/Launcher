import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

let app: any;
let auth: any;
let db: any;
let analytics: any;

export const initializeFirebase = async () => {
  if (!app) {
    try {
      const config = await getFirebaseConfig();
      app = initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app);
      analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  }
  return { app, auth, db, analytics };
};

export { auth, db, analytics };
export default app;