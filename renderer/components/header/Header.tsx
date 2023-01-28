import { useRecoilState } from 'recoil';
import { authState, userState } from '../../recoil/authAtom';
import { formatJWTtoJSON } from '../../utils/formatJWT';
import Store from 'electron-store';
import { useEffect } from 'react';

const store = new Store<string | any>();

export default function Header() {
  const [token, setToken] = useRecoilState<string>(authState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (token.length > 0) {
      setUser(formatJWTtoJSON(token));
    } else {
      if (store.get('accessToken')) {
        setToken(store.get('accessToken'));
        const data = formatJWTtoJSON(store.get('accessToken'));
        setUser({
          isAuthenticated: true,
          email: data.email,
          displayName: '',
          photoURL: '',
        });
      }
    }
  }, []);
  return <header>{user.email?.length > 0 ? <p>Hello, {user.email}!!</p> : <p>로그인</p>}</header>;
}
