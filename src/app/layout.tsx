import '../styles/globals.css';
import Header from '@component/Header';
import React from 'react';

export const metadata = {
  title: 'Review For Me',
  description: '동료들이 작성하는 나의 평가',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
