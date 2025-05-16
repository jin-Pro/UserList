import Author from '@component/Author';
import Spacing from '@component/Spacing';
import { createClient } from '@lib/supabase/server';
import Link from 'next/link';
import c from 'src/util/c';
import formatDateToYYMMDDHHMM from 'src/util/formatTime';

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabase = await createClient();
  const [{ data: user }, { data: Posts }] = await Promise.all([
    supabase.from('User').select('*').eq('id', id),
    supabase.from('Post').select('*'),
  ]);

  return (
    <div className="relative w-[100vw] h-[calc(100svh-60px)] px-[12px]">
      <Spacing className="h-[20px]" />

      <h1>{user[0].name} 님에 대한 평가를 해주세요</h1>

      <Spacing className="h-[20px]" />

      <ul className="px-[8px] space-y-[16px]">
        {Posts.map((post) => (
          <Link href={`/users/${id}/${post.id}`} key={post.id}>
            <li
              className={c(
                'list-none',
                'w-full min-h-[40px]',
                'rounded-[8px]',
                'border-[0.5px] border-gray-300 shadow-stone-200',
                'px-[12px] py-[6px]',
              )}
            >
              <span className="flex items-center justify-between">
                <p>{post.Content}</p>
                <p>{post.Score}점 / 5점</p>
              </span>

              <Spacing className="h-[12px]" />

              <span className="flex items-center justify-between">
                <p>{formatDateToYYMMDDHHMM(post.created_at)}</p>
                <Author userId={post.Author} />
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <Link
        href={`/users/${id}/write`}
        className={c(
          'w-[70px] h-[70px]',
          'flex items-center justify-center',
          'rounded-full border-[1px] border-amber-500 bg-white',
          'absolute bottom-0 right-0',
          '-translate-y-1/4 -translate-x-1/4',
        )}
      >
        <button>평가하기</button>
      </Link>
    </div>
  );
}
