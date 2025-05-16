import LogoutButton from '@component/Header/LogoutButton';
import { createClient } from '@lib/supabase/server';
import LoginButton from './LoginButton';
import c from 'src/util/c';

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ul
      className={c(
        'flex',
        'justify-between',
        'items-center',
        'h-[50px]',
        'border-b-[1px] border-gray-300',
      )}
    >
      <li>동료 리뷰 서비스</li>
      <li>{user ? <LogoutButton /> : <LoginButton />}</li>
    </ul>
  );
};

export default Header;
