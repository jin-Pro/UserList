import { supabase } from '@lib/supabaseClient';

export const metadata = {
  title: 'Home2',
  description: 'Using App Router Home',
};

export default async function Home() {
  const { data } = await supabase.from('User').select('*');
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <span className="text-4xl font-bold text-red-400">안녕하세요</span>
    </div>
  );
}
