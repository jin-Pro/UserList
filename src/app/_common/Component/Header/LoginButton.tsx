import Link from 'next/link';
import c from 'src/util/c';

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className={c(
        'bg-white',
        'border-[0.5px] border-blue-400',
        'rounded-[10px]',
        'h-[40px] w-[150px]',
      )}
    >
      로그인
    </Link>
  );
};

export default LoginButton;
