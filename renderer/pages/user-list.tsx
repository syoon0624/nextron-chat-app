import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Seo from '../components/Seo';
import { getUsers } from '../firebase';
import { userState } from '../recoil/authAtom';
import Store from 'electron-store';

const store = new Store();

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (store.get('accessToken')) {
      const getUserList = async () => {
        let arr = [];
        const data = await getUsers();
        if (data) {
          for (let i of Object.keys(data)) {
            const obj = { uid: i, ...data[i] };
            arr.push(obj);
          }
        }
        setUsers(arr);
      };
      getUserList();
    } else {
      alert('로그인을 먼저 해주세요!');
      router.push('/auth/login');
    }
  }, []);
  return (
    <>
      <Seo title="User List" />
      <div className="wrapper">
        <ul>
          <li className="user-profile">
            <span>
              <img src={user.photoURL} alt="profile-img" />
              <p>{user.displayName}</p>
            </span>
            <p>{user.email}</p>
          </li>
          <p>이용자 목록: {users.length - 1}</p>
          {users.length > 0
            ? users
                .filter((ele) => ele.uid !== user.uid)
                .map((user) => {
                  return (
                    <li key={user.uid}>
                      <span>
                        <img src={user.photoURL} alt="profile-img" />
                        <p>{user.displayName}</p>
                      </span>
                      <p>{user.email}</p>
                    </li>
                  );
                })
            : ''}
        </ul>
      </div>
      <style jsx>
        {`
          .wrapper {
            margin-top: 20px;
          }
          .user-profile {
            border-bottom: 1px solid black;
            margin-bottom: 20px;
          }
          span {
            display: flex;
            align-items: center;
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10px;
          }
          img {
            width: 50px;
            padding: 0px 10px;
          }
        `}
      </style>
    </>
  );
}
