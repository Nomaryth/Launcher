import { headers } from 'next/headers';

const serverConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export async function getFirebaseConfig() {
  const headersList = await headers();
  const origin = headersList.get('origin');

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ?.split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (process.env.NODE_ENV === 'production' && allowedOrigins && allowedOrigins.length > 0) {
    if (!origin || !allowedOrigins.includes(origin)) {
      throw new Error('Unauthorized origin');
    }
  }

  return {
    apiKey: serverConfig.apiKey,
    authDomain: serverConfig.authDomain,
    projectId: serverConfig.projectId,
    storageBucket: serverConfig.storageBucket,
    messagingSenderId: serverConfig.messagingSenderId,
    appId: serverConfig.appId,
    measurementId: serverConfig.measurementId,
  };
}
