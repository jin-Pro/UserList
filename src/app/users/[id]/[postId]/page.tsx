import Spacing from '@component/Spacing';
import { createClient } from '@lib/supabase/server';
import c from 'src/util/c';
import WriteComment from './component/WriteComment';
import Author from '@component/Author';
import formatDateToYYMMDDHHMM from 'src/util/formatTime';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const { id, postId } = await params;

  const supabase = await createClient();

  const [user, post, { data: comments }] = await Promise.all([
    (await supabase.from('User').select('*').eq('id', id)).data[0],
    (await supabase.from('Post').select('*').eq('id', Number(postId))).data[0],
    supabase.from('Comment').select('*').eq('PostId', Number(postId)),
  ]);

  const author = (await supabase.from('User').select('*').eq('id', post.Author))
    .data[0];

  return (
    <div className={c('px-[20px] pt-[20px]', 'w-full h-full', 'list-none')}>
      <div className="flex items-center justify-between">
        <span>작성자 : {`${author.name}`}</span>
        <span>평점 : {`${post.Score} 점 / 5 점`}</span>
      </div>

      <Spacing className="h-[20px]" />

      <div
        className={c(
          'border-[0.5px] border-gray-300 shadow-stone-200',
          'rounded-[8px]',
          'px-[8px] py-[12px]',
          'min-h-[200px]',
        )}
      >
        <Spacing className="h-[6px]" />
        <p>{post.Content}</p>
      </div>

      <Spacing className="h-[20px]" />

      <div className={c('w-full h-[calc(100svh-500px)]', 'overflow-y-auto')}>
        {comments.length > 0 && (
          <ul className="space-y-[20px] mb-[20px]">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className={c(
                  'border-[0.5px] border-gray-300 shadow-stone-200',
                  'rounded-[8px]',
                  'px-[8px] py-[12px]',
                  'min-h-[40px]',
                  'mb-[10px]',
                )}
              >
                <Author userId={comment.Author} />
                <Spacing className="h-[6px]" />
                <p>{comment.Content}</p>
                <Spacing className="h-[6px]" />
                <p>{formatDateToYYMMDDHHMM(comment.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Spacing className="h-[20px]" />

      <WriteComment postId={postId} writerId={user.id} />
    </div>
  );
}
