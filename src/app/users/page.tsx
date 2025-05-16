import { createClient } from '@lib/supabase/server';
import Link from 'next/link';
import c from 'src/util/c';

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
    <ul className={c('px-[20px] pt-[20px]')}>
      {others.map((other) => (
        <Link
          key={other.id}
          href={`/users/${other.id}`}
          className={c(
            'list-none',
            'border-[0.5px] rounded-[8px] border-gray-300 shadow-stone-200',
            'w-full h-[50px]',
            'block px-[16px]',
            'flex items-center space-x-[4px]',
          )}
        >
          <span>
            {other.name} ( {other.email} )
          </span>
          <Score userId={other.id} />
        </Link>
      ))}
    </ul>
  );
}

const Score = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('Post')
    .select('Score')
    .eq('userId', userId);
  const totalScore = data.reduce((acc, cur) => acc + cur.Score, 0);
  const score = data.length === 0 ? 0 : Math.round(totalScore / data.length);
  return <span>{score} / 5 점</span>;
};
