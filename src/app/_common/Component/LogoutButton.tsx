'use client';

import { createClient } from '@lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    supabase.auth.signOut();
    router.push('/login');
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
