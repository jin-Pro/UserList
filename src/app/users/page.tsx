import { createClient } from '@lib/supabase/server';
import Link from 'next/link';

export default async function UserListPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: others } = await supabase
    .from('User')
    .select('*')
    .neq('id', user.id); // 나를 제외한 유저들

  return (
    <div>
      {others.map((other) => (
        <Link key={other.id} href={`/users/${other.id}`}>
          {other.email}
        </Link>
      ))}
    </div>
  );
}
