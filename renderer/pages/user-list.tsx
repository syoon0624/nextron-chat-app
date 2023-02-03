import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import { getUsers } from '../firebase';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
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
  }, []);
  return (
    <>
      <Seo title="User List" />
      <div className="wrapper">
        <h1>총 사용자 수: {users.length}</h1>
        <ul>
          {users.length > 0
            ? users.map((user) => {
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
          span {
            display: flex;
            align-items: center;
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10px;
            border-bottom: 1px solid black;
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
