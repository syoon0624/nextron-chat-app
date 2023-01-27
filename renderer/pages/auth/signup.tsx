import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signUp } from '../../firebase';

interface userType {
  email: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<userType>();

  const onSubmit = async (data: userType) => {
    const user = await signUp(data.email, data.password);
    console.log(user);
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
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}
