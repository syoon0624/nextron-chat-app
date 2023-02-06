import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, onValue } from 'firebase/database';
import { database, writeMessages } from '../../firebase';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/authAtom';
import Message from '../../components/chat/Message';

export interface ChatType {
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
  const { register, handleSubmit, setValue } = useForm<MessageType>();
  const router = useRouter();

  const messageRef = ref(database, `/messages/${router.query.room}`);
  const onSubmit = async (data: MessageType) => {
    if (router.query.room) {
      await writeMessages(router.query.room, data.message, user.photoURL, Date.now(), user.uid, user.displayName);
      setValue('message', '');
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
    <>
      <ul>
        {chats.length > 0
          ? chats.map((chat) => {
              return <Message chat={chat} />;
            })
          : ''}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('message')} />
        <button type="submit">전송</button>
      </form>
    </>
  );
}
