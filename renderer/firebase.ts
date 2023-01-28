import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCLEOMgt_rLCOBkpeyCyqofaItZ5QsxiLc',
  authDomain: 'nextron-chat-app-1068b.firebaseapp.com',
  projectId: 'nextron-chat-app-1068b',
  storageBucket: 'nextron-chat-app-1068b.appspot.com',
  messagingSenderId: '102889347071',
  appId: '1:102889347071:web:1bfbe035e3fb5ef31f79ca',
  measurementId: 'G-YQTST5GCQ7',
  databaseURL: 'https://nextron-chat-app-1068b-default-rtdb.firebaseio.com/',
};

interface User {
  [key: string]: string;
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
const database = getDatabase();
const storage = getStorage(app);

export const signUp = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentail) => {
      const user = userCredentail.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
    });
};

export const updateUser = async (displayName: string, photoURL: string) => {
  if (auth.currentUser !== null) {
    updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    })
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode}`);
        console.log(`error message: ${errorMessage}`);
      });
  }
};
