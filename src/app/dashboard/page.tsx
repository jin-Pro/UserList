// /app/dashboard/page.tsx

import { createClient } from '@lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  console.log('user', user);
  return <div>로그인 완료</div>;
}
