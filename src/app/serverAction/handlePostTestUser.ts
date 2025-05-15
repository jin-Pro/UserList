'use server';
import { createClient } from '@lib/supabase/server';

const handlePostTestUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('User')
    .insert([{ email: 'dnjun2@ajou.ac.kr', id: user.id }]);
};

export default handlePostTestUser;
