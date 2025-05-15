// /app/dashboard/page.tsx

import { createClient } from '@lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div>로그인 완료</div>;
}
