import { Inter } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/auth/login">Go to login page</Link>
          <Link href="/auth/signup">Go to signup page</Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </>
  );
}
