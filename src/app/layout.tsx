import '../styles/globals.css';

export const metadata = {
  title: 'Review For Me',
  description: '동료들이 진행하는 진실한 나의 평가',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
