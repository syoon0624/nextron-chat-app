import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Seo from '../../components/common/Seo';
import { userState } from '../../recoil/authAtom';
import Store from 'electron-store';
import { getMessages, getUserChatRooms } from '../../firebase';
import { formatDate } from '../../utils/formatDate';

const store = new Store();

interface RoomType {
  userId: string;
  lastMessage: string;
  profileImg: string;
  roomId: string;
  roomType: string;
  roomUsersName: string;
  roomUserList: string;
  timestamp: number;
}

interface MessageType {
  lastMessage: string;
  time: string;
}

export default function ChatIndex() {
  const [user, setUser] = useRecoilState(userState);
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [messageInfo, setMessageInfo] = useState<MessageType[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getRoomList = async () => {
      const newRoomList = [];
      const getRooms = await getUserChatRooms();
      const newMessageInfo = [];

      if (getRooms) {
        for (let i of Object.keys(getRooms)) {
          if (i === user.uid) {
            for (let j of Object.keys(getRooms[i])) {
              newRoomList.push(getRooms[i][j]);
              const lastMessage = await getMessages(getRooms[i][j].roomId, 1);
              if (lastMessage) {
                const lastMessageInfo = lastMessage[Object.keys(lastMessage)[0]];
                newMessageInfo.push({
                  lastMessage: lastMessageInfo.message,
                  time: formatDate(lastMessageInfo.timestamp),
                });
              }
            }
            break;
          }
        }
        setRoomList(newRoomList);
        setMessageInfo(newMessageInfo);
      }
    };
    getRoomList();
    if (store.get('accessToken')) {
    } else {
      alert('로그인을 먼저 해주세요!');
      router.push('/auth/login');
    }
  }, [user]);
  const chatRoomNavigate = (roomId: string) => {
    router.push(`/chat-room/${roomId}`);
  };
  return (
    <>
      <Seo title="Chat-Room" />
      <div>
        <ul>
          {roomList.length > 0 ? (
            <>
              {roomList.map((room, index) => {
                return (
                  <li
                    key={room.roomId}
                    className="list-wrap"
                    onClick={() => {
                      chatRoomNavigate(room.roomId);
                    }}
                  >
                    <div className="left-wrap">
                      <img src={room.profileImg} />
                      <span>
                        <p>
                          {room.roomUsersName.split('@spl@').map((ele, index) => {
                            if (index > 0) return ele;
                          })}
                        </p>
                        <p>{messageInfo[index] ? messageInfo[index].lastMessage : '대화 없음'}</p>
                      </span>
                    </div>
                    <p>{messageInfo[index] ? messageInfo[index].time : ''}</p>
                  </li>
                );
              })}
            </>
          ) : (
            ''
          )}
        </ul>
      </div>
      <style jsx>{`
        .list-wrap {
          padding: 10px;
          border-bottom: 1px solid black;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .list-wrap:hover {
          background-color: skyblue;
        }
        .left-wrap {
          display: flex;
        }
        img {
          border-radius: 10px;
          width: 50px;
        }
      `}</style>
    </>
  );
}
