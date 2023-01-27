import React from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { signIn } from '../../firebase';

interface userType {
  email: string;
  password: string;
}

function Login() {
  const { register, handleSubmit } = useForm<userType>();

  const onSubmit = async (data: userType) => {
    const user = await signIn(data.email, data.password);
    console.log(user);
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
