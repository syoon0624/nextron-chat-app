import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentail) => {
      const user = userCredentail.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
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
  console.log(auth.currentUser);
  if (auth.currentUser !== null) {
    console.log('hello!');
    console.log(displayName);
    console.log(photoURL);
    return updateProfile(auth.currentUser, {
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
        return errorMessage;
      });
  }
};
