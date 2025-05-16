// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@lib/supabase/client';
import AuthContainer from '@component/AuthContainer';

export default function RegisterPage() {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleRegister = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp(loginInfo);
    const { error: err } = await supabase.from('User').insert([
      {
        id: data.user.id,
        email: loginInfo.email,
        name: loginInfo.name,
      },
    ]);
    if (error || err) {
      alert((error || err).message);
    } else {
      alert('회원가입 성공! 이메일 인증을 확인해주세요.');
      router.push('/login');
    }
  };

  return (
    <AuthContainer title="회원가입">
      <div className="space-y-4">
        <input
          type="email"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="이메일"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="비밀번호"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="name"
          value={loginInfo.name}
          onChange={(e) =>
            setLoginInfo((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="이름"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          회원가입
        </button>
        <p className="text-sm text-center">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </AuthContainer>
  );
}
