import { createClient } from '@lib/supabase/server';
import Link from 'next/link';

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // console.log('params.id : ', params.id);
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase.from('User').select('*').eq('id', id);

  const { data: Posts } = await supabase.from('Post').select('*');

  return (
    <div>
      <h1>안녕하세요 {user[0].email} 입니다.</h1>
      {Posts.map((post) => (
        <li>
          <h2>{post.Content}</h2>
          <p>{post.Score}</p>
          <p>{post.created_at}</p>
          <p>{post.isPrivate ? '비공개' : '공개'}</p>
          <p>{post.Author}</p>
        </li>
      ))}
      <Link href={`/users/${id}/write`}>
        <button>글쓰기</button>
      </Link>
    </div>
  );
}
