'use server';

import { createClient } from '@lib/supabase/server';

export const handlePostComment = async ({
  Content,
  PostId,
  Author,
  onSuccess,
}: {
  Content: string;
  PostId: number;
  Author: string;
  onSuccess: () => void;
}) => {
  if (Content.length === 0) return;
  const supabase = await createClient();
  const { error } = await supabase.from('Comment').insert({
    Content,
    PostId,
    Author,
    isPrivate: false,
  });

  if (!error) {
    onSuccess();
  }
};
