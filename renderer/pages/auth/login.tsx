import React from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { signIn } from '../../firebase';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/authAtom';
import Store from 'electron-store';

const store = new Store();

interface userType {
  email: string;
  password: string;
}

function Login() {
  const { register, handleSubmit } = useForm<userType>();
  const [token, setToken] = useRecoilState(authState);
  const onSubmit = async (data: userType) => {
    const user = await signIn(data.email, data.password);
    if (user.accessToken) {
      store.set('accessToken', user.accessToken);
      const accessToken: any = store.get('accessToken');
      setToken(accessToken);
    }
  };

  return (
    <div>
      <p>
        LoginPage!
        <Link href="/home">Go to Home page</Link>
        <Link href="/auth/signup">Go to signup page</Link>
      </p>
      <img src="/images/logo.png" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
export default Login;
