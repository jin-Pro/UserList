import { createClient } from '@lib/supabase/server';

const Author = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();
  const { data } = await supabase.from('User').select('*').eq('id', userId);
  return <p>{data[0].name}</p>;
};

export default Author;
