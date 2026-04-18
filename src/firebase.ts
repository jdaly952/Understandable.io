import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Core Firebase Configuration - Sourced from user manually
const firebaseConfig = {
  apiKey: "AIzaSyAIz_lkfpbthiLRc9WO8beb31LemYSyIX8",
  authDomain: "gen-lang-client-0155880326.firebaseapp.com",
  projectId: "gen-lang-client-0155880326",
  storageBucket: "gen-lang-client-0155880326.firebasestorage.app",
  messagingSenderId: "246872621509",
  appId: "1:246872621509:web:ce4465f29970b1f638cbac",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-2ea48f28-f943-4d1a-9384-5bc746a41df1");

/**
 * Connectivity test for Firestore. 
 * Essential for diagnosing security rule issues or network blocks in the preview iframe.
 */
import { getDocFromServer, doc } from 'firebase/firestore';

export async function testFirebaseConnection() {
  try {
    // Attempt to fetch a non-existent doc from the server specifically to test the link
    await getDocFromServer(doc(db, '_internal_', 'connection_test'));
    console.log("Firebase Engine: Connection established.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase Engine: Connectivity error detected. Check config or authorized domains.");
    }
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
