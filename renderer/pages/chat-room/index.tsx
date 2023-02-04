import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Seo from '../../components/Seo';
import { userState } from '../../recoil/authAtom';
import Store from 'electron-store';

const store = new Store();

export default function ChatIndex() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (store.get('accessToken')) {
    } else {
      alert('로그인을 먼저 해주세요!');
      router.push('/auth/login');
    }
  }, []);
  return (
    <>
      <Seo title="Chat-Room" />
      <div>
        <h1>This is ChatRoom</h1>
      </div>
    </>
  );
}
