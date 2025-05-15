'use server';

import { createClient } from '@lib/supabase/server';

export const handleSubmit = async ({
  Author,
  userId,
  Content,
  Score,
  isPrivate,
}: {
  Author: string;
  userId: string;
  Content: string;
  Score: number;
  isPrivate: boolean;
}) => {
  const supabase = await createClient();
  const { error } = await supabase.from('Post').insert([
    {
      Content,
      Score,
      isPrivate,
      Author,
      userId,
    },
  ]);
};
