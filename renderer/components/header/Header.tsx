import { useRecoilState } from 'recoil';
import { authState, userState } from '../../recoil/authAtom';
import { formatJWTtoJSON } from '../../utils/formatJWT';
import Store from 'electron-store';
import { useEffect } from 'react';
import Link from 'next/link';
import NavBar from './NavBar';
import { useRouter } from 'next/router';

const store = new Store<string | any>();

export default function Header() {
  const [token, setToken] = useRecoilState<string>(authState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const logoutHandler = () => {
    setToken('');
    setUser({
      isAuthenticated: false,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
    });
    store.delete('accessToken');
    alert('로그아웃 성공!');
    router.push('/home');
  };
  useEffect(() => {
    if (token.length > 0) {
      const data = formatJWTtoJSON(store.get('accessToken'));
      setUser({
        isAuthenticated: true,
        uid: data.user_id,
        email: data.email,
        displayName: data.name,
        photoURL: data.picture,
      });
    } else {
      if (store.get('accessToken')) {
        const data = formatJWTtoJSON(store.get('accessToken'));
        setToken(store.get('accessToken'));
        setUser({
          isAuthenticated: true,
          uid: data.user_id,
          email: data.email,
          displayName: data.name,
          photoURL: data.picture,
        });
      }
    }
  }, [token]);
  return (
    <header>
      <div className="header-wrap">
        <NavBar />
        {user.isAuthenticated ? (
          <>
            <p>Hello, {user.displayName}!!</p>
            <img src={user.photoURL} alt="profile-img" />
            <button onClick={logoutHandler}>로그 아웃</button>
          </>
        ) : (
          <Link href="/auth/login">로그인</Link>
        )}
      </div>
      <style jsx>{`
        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        img {
          width: 50px;
        }
      `}</style>
    </header>
  );
}
