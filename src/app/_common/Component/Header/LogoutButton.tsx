'use client';

import { createClient } from '@lib/supabase/client';

import { useRouter } from 'next/navigation';
import c from 'src/util/c';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    createClient().auth.signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className={c(
        'bg-white',
        'border-[0.5px] border-blue-400',
        'rounded-[10px]',
        'h-[40px] w-[150px]',
      )}
    >
      로그아웃
    </button>
  );
}
