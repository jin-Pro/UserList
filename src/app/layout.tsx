import LogoutButton from '@component/LogoutButton';
import '../styles/globals.css';

import handlePostTestUser from './serverAction/handlePostTestUser';

export const metadata = {
  title: 'Review For Me',
  description: '동료들이 진행하는 진실한 나의 평가',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <form action={handlePostTestUser}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Click me
          </button>
        </form>
        <LogoutButton />
        {children}
      </body>
    </html>
  );
}
