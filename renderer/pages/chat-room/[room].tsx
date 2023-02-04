import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, onValue } from 'firebase/database';
import { database, writeMessages } from '../../firebase';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/authAtom';

interface ChatType {
  roomId: string | string[];
  message: string;
  profileImg: string;
  timestamp: number;
  uid: string;
  username: string;
}
type MessageType = {
  message: string;
};
export default function ChatRoom() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit } = useForm<MessageType>();
  const router = useRouter();

  const messageRef = ref(database, `/messages/${router.query.room}`);
  const onSubmit = async (data: MessageType) => {
    if (router.query.room) {
      writeMessages(router.query.room, data.message, user.photoURL, Date.now(), user.uid, user.displayName);
    }
  };
  useEffect(() => {
    onValue(messageRef, (snapshot) => {
      const messageInfo = snapshot.val();
      const newArray = [];
      console.log(router.query.room);
      console.log(messageInfo);
      if (messageInfo) {
        for (let i of Object.keys(messageInfo)) {
          newArray.push(messageInfo[i]);
        }
        console.log(newArray);
        setChats(newArray);
      }
    });
  }, []);
  return (
    <h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {chats.length > 0
          ? chats.map((chat) => {
              return <p>{chat.message}</p>;
            })
          : ''}
        <input {...register('message')} />
        <button type="submit">전송</button>
      </form>
    </h1>
  );
}
