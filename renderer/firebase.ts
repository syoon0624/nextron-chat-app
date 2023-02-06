import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, query, limitToLast } from 'firebase/database';
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);
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
  //console.log(auth.currentUser);
  if (auth.currentUser !== null) {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    })
      .then(() => {
        console.log('User updated successfully');
        return auth.currentUser;
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

export const writeUserData = async (userId: string, name: string, email: string, imageUrl: string) => {
  try {
    await set(ref(database, 'users/' + userId), {
      displayName: name,
      email: email,
      photoURL: imageUrl,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  const dbRef = ref(database);
  return get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// roomId: 생성한 userId + 시간
export const writeChatRoom = async (roomId: string, userIds: {}) => {
  try {
    await set(ref(database, 'roomUsers/' + roomId), userIds);
    console.log('성공!');
  } catch (err) {
    console.log(err);
  }
};

export const getChatRoom = async () => {
  const dbRef = ref(database);
  return get(child(dbRef, `roomUsers/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const writeUserChatRooms = async (
  userId: string,
  lastMessage: string,
  profileImg: string,
  roomId: string,
  roomType: string,
  roomUsersName: string,
  roomUserList: string,
  timestamp: number
) => {
  try {
    await set(ref(database, `userChatRooms/${userId}/${roomId}`), {
      lastMessage,
      profileImg,
      roomId,
      roomType,
      roomUsersName,
      roomUserList,
      timestamp,
    });
    console.log('방생성 성공!');
  } catch (err) {
    console.log(err);
  }
};

export const getUserChatRooms = async () => {
  const dbRef = ref(database);
  return get(child(dbRef, `userChatRooms/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const writeMessages = async (
  roomId: string | string[],
  message: string,
  profileImg: string,
  timestamp: number,
  uid: string,
  username: string
) => {
  try {
    await set(ref(database, `messages/${roomId}/${timestamp}`), {
      roomId,
      message,
      profileImg,
      timestamp,
      uid,
      username,
    });
    console.log('채팅 보내기 성공!');
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = async (roomId: string, limits = 50) => {
  const dbRef = query(ref(database, `messages/${roomId}`), limitToLast(limits));
  try {
    const data = await get(dbRef);
    if (data.exists()) {
      const getData = data.val();
      return getData;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getDB = async (path: string) => {
  const dbRef = ref(database);
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
