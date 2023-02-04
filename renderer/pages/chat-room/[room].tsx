import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ChatUserType {
  uid: string;
  name: string;
  photoURL: string;
  message: string;
}
type MessageType = {
  message: string;
};
export default function ChatRoom() {
  const [chats, setChats] = useState([]);
  const { register, handleSubmit } = useForm<MessageType>();

  const onSubmit = async (data: MessageType) => {
    data.message;
  };
  return (
    <h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('message')} />
        <button type="submit">전송</button>
      </form>
    </h1>
  );
}
