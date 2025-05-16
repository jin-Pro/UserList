import AuthContainer from '@component/AuthContainer';
import { createClient } from '@lib/supabase/server';
import PostForm from './Component/PostForm';

export default async function WritePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabase = await createClient();
  const [{ data: user }, { data: me }] = await Promise.all([
    supabase.from('User').select('*').eq('id', id),
    supabase.auth.getUser(),
  ]);

  return (
    <AuthContainer title="게시글 작성">
      <PostForm Author={me.user.id} userId={user[0].id} />
    </AuthContainer>
  );
}
