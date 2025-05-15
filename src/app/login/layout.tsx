import { createClient } from '@lib/supabase/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const Layout = async ({ children }: PropsWithChildren) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/users');
  return children;
};

export default Layout;
