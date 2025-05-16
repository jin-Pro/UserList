import Author from '@component/Author';
import Spacing from '@component/Spacing';
import { createClient } from '@lib/supabase/server';
import Link from 'next/link';
import c from 'src/util/c';
import formatDateToYYMMDDHHMM from 'src/util/formatTime';

export default async function UserListPage() {
  const supabase = await createClient();
  const posts = (await supabase.from('Post').select('*')).data;

  return (
    <ul className="px-[8px] space-y-[16px]">
      {posts.map((post) => (
        <Link href={`/users/${post.userId}/${post.id}`} key={post.id}>
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
  );
}
