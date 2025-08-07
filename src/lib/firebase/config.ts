export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getFirebaseConfig = async () => {
  try {
    const response = await fetch('/api/firebase-config');
    if (!response.ok) {
      throw new Error('Failed to load Firebase configuration');
    }
    const serverConfig = await response.json();
    // server has precedence to ensure required fields are present
    return {
      ...firebaseConfig,
      ...serverConfig,
    };
  } catch (error) {
    console.error('Error loading Firebase config:', error);
    return firebaseConfig;
  }
};

export const firebaseDevConfig = {
  emulatorHost: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST || 'localhost',
  emulatorPort: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PORT || '8080'
};

export const firebaseFreePlanConfig = {
  limits: {
    firestore: {
      storage: '1GB',
      readsPerDay: 50000,
      writesPerDay: 20000,
      deletesPerDay: 20000,
    },
    storage: {
      storage: '5GB',
      downloadsPerDay: '1GB',
      uploadsPerDay: '1GB',
    },
    auth: {
      usersPerMonth: 10000,
    },
    hosting: {
      storage: '10GB',
      dataTransfer: '10GB',
    }
  },

  optimization: {
    localCache: {
      enabled: true,
      maxAge: 24 * 60 * 60 * 1000,
      maxSize: 50,
    },
    
    compression: {
      enabled: true,
      minSize: 1024,
    },
    
    batchOperations: {
      enabled: true,
      maxBatchSize: 500,
      delay: 1000,
    }
  }
};

export const firebaseSecurityConfig = {
  firestoreRules: `
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /public/{document=**} {
          allow read: if true;
          allow write: if false;
        }
        
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        
        match /profiles/{profileId} {
          allow read: if true; // Público para reduzir autenticação
          allow write: if request.auth != null && request.auth.uid == profileId;
        }
        
        match /game/{document=**} {
          allow read: if true;
          allow write: if request.auth != null;
        }
      }
    }
  `,
  
  storageRules: `
  `
};

export const firebasePerformanceConfig = {
  cacheConfig: {
    maxSize: 50,
    maxAge: 12 * 60 * 60 * 1000,
  },
  
  networkConfig: {
    timeout: 15000,
    retryAttempts: 2,
  },

  monitoring: {
    enabled: true,
    dataCollectionEnabled: true,
    instrumentationEnabled: true,
    customTraces: {
      PAGE_LOAD: 'page_load',
      USER_ACTION: 'user_action',
      DATA_FETCH: 'data_fetch',
    },
    samplingRate: 0.1,
  }
};

export const firebaseAnalyticsConfig = {
  customEvents: {
    PAGE_VIEW: 'page_view',
    USER_LOGIN: 'user_login',
    USER_ACTION: 'user_action',
  },

  userProperties: {
    USER_TYPE: 'user_type',
    FEATURE_USAGE: 'feature_usage',
  },
  
  limits: {
    maxEventsPerSession: 50,
    maxUserProperties: 25,
  }
};

export const firebaseMessagingConfig = {
  enabled: false,
  notificationConfig: {
    title: 'Nomary',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  },
  
  topics: {
    ANNOUNCEMENTS: 'announcements',
    UPDATES: 'updates',
    EVENTS: 'events',
  }
};

export const firebaseAuthConfig = {
  providers: {
    google: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    github: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    },
    email: {
      enabled: true,
      requireVerification: false,
    },
  },
  
  sessionConfig: {
    persistence: 'local',
    timeout: 60 * 60 * 24 * 7,
  }
};

export const firebaseBackupConfig = {
  autoBackup: {
    enabled: false,
    frequency: 'weekly',
    retention: 7,
  },
  
  offlineSync: {
    enabled: true,
    maxQueueSize: 100,
    syncInterval: 10000,
  }
};

export const firebaseMonitoringConfig = {
  logging: {
    enabled: true,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    maxEntries: 100,
  },
  
  metrics: {
    enabled: true,
    collectionInterval: 300000,
  }
};

export const firebaseAllConfig = {
  config: firebaseConfig,
  dev: firebaseDevConfig,
  freePlan: firebaseFreePlanConfig,
  security: firebaseSecurityConfig,
  performance: firebasePerformanceConfig,
  analytics: firebaseAnalyticsConfig,
  messaging: firebaseMessagingConfig,
  auth: firebaseAuthConfig,
  backup: firebaseBackupConfig,
  monitoring: firebaseMonitoringConfig,
};