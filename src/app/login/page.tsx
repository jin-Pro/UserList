'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@lib/supabase/client';
import AuthContainer from '@component/AuthContainer';

export default function LoginPage() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const { error } = await createClient().auth.signInWithPassword(loginInfo);

    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard');
      router.refresh(); // ✅ 쿠키 반영된 후 서버 측 렌더링을 강제로 새로고침
    }
  };

  return (
    <AuthContainer title="로그인">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
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
        <button
          // onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          로그인
        </button>
        <p className="text-sm text-center">
          계정이 없으신가요?
          <a href="/register" className="text-blue-600 hover:underline">
            회원가입
          </a>
        </p>
      </form>
    </AuthContainer>
  );
}
