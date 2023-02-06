import { Inter } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '../components/common/Seo';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Seo title="Home" />
      <div>
        <p>HOME Page</p>
        <img src="/images/logo.png" />
      </div>
    </>
  );
}
