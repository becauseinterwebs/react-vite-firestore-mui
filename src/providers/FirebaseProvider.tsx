import {createContext, useState, useEffect, ReactNode} from 'react';
import {initializeApp, getApp, FirebaseApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, User, Auth} from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import 'firebase/database';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {
  getStorage,
  FirebaseStorage,
} from 'firebase/storage';
//import LogRocket from 'logrocket';

const config = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASEURL,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENTID,
};

//firestore.setLogLevel('debug');

const app = initializeApp(config);

const firestoreSettings: firestore.FirestoreSettings & {
  useFetchStreams: boolean;
} = {
  useFetchStreams: false,
};

const db = firestore.initializeFirestore(app, firestoreSettings);

const auth = getAuth(app);

const functions = getFunctions(app);

interface DefaultListenerOptions {
    snapshotListenOptions: {
        includeMetadataChanges: boolean;
    }
}

const defaultListenerOptions: DefaultListenerOptions = {
  snapshotListenOptions: { 
    includeMetadataChanges: true 
  },
};

export interface FirebaseContextProps {
  firebaseUser: User | null;
  isTestUser: boolean;
  defaultListenerOptions: DefaultListenerOptions;
  callable: (name: string, data?: unknown) => Promise<unknown>;
  getBatch: () => firestore.WriteBatch;
  db: firestore.Firestore;
  app: FirebaseApp;
  auth: Auth;
  getCdn: () => FirebaseStorage;
}

export const FirebaseContext = createContext<Partial<FirebaseContextProps>>({});

export default function FirebaseProvider ({ children }:{ children: ReactNode }) {

    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

    useEffect(() => { 
        (async () => {
            onAuthStateChanged(auth, async user => {
                setFirebaseUser(user);
                try {
                    if (user?.displayName && user?.email) {
                        /*
                        LogRocket.identify(user.uid, {
                            name: user.displayName,
                            email: user.email,
                        });
                        */
                    }
                } catch (err: unknown) { 
                    if (err instanceof Error)
                        console.log(`Error:`, err.message);
                }
            });
            })();
    }, []);

    const getCdn = () => {
        const a = getApp();
        return getStorage(a, `gs://${(import.meta.env.VITE_REACT_APP_CDN || '')
                .replace('https://', '')
                .replace('storage.googleapis.com/', '')}`);
    }

    const getBatch = () => firestore.writeBatch(db);

    const callable = async (name: string, data?: unknown): Promise<unknown> => {
        const func = httpsCallable(functions, name);
        try {
            return await func(data || {});
        } catch (error) {
            console.log(error);
            return {error};
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                db,
                app,
                auth,
                callable,
                getBatch,
                firebaseUser,
                getCdn,
                defaultListenerOptions,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
