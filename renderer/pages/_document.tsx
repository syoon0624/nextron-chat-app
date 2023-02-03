import { Html, Head, Main, NextScript } from 'next/document';
import { RecoilRoot } from 'recoil';
import Header from '../components/header/Header';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
