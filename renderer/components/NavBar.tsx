import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href="/home">Home</Link>
      <Link href="/user-list">사용자 목록</Link>
      <Link href="/chat-room">채팅방</Link>
    </nav>
  );
}
