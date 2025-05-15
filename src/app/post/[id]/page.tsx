import { createClient } from '@lib/supabase/server';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('Post')
    .select('*')
    .eq('id', Number(params.id));

  const { data: comments } = await supabase
    .from('Comment')
    .select('*')
    .eq('PostId', Number(params.id));

  return (
    <div>
      <div className="p-[16px] rounded-[20px] border-[0.5px] border-[#E4E4E7] bg-white">
        <h1>{post[0].Content}</h1>
        <p>{post[0].Score}</p>
        <p>{post[0].created_at}</p>
        <p>{post[0].isPrivate ? '비공개' : '공개'}</p>
        <p>{post[0].Author}</p>
      </div>
      <div className="h-[20px]" />
      <ul>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-[16px] rounded-[20px] border-[0.5px] border-[#E4E4E7] bg-white"
          >
            <h1>{comment.Content}</h1>
            <p>{comment.created_at}</p>
            <p>{comment.isPrivate ? '비공개' : '공개'}</p>
            <p>{comment.Author}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
