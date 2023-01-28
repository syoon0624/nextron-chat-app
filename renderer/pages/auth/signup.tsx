import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth, signIn, signUp, updateUser } from '../../firebase';

interface userType {
  email: string;
  password: string;
  displayName: string;
  photoURL: any;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<userType>();
  const [photoURL, setPhotoURL] = useState<string>('https://i.stack.imgur.com/l60Hf.png');
  console.log(auth.currentUser);
  const onSubmit = async (data: userType) => {
    const user = await signUp(data.email, data.password);
    if (user === undefined) {
      await signIn(data.email, data.password);
      await updateUser(data.displayName, photoURL);
    }
  };
  return (
    <div>
      <p>This is SignUp Page</p>
      <nav>
        <li>
          <Link href="/home">Go to home page</Link>
        </li>
        <li>
          <Link href="/auth/login">Go to login page</Link>
        </li>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <input type="text" placeholder="닉네임" {...register('displayName')} />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}
