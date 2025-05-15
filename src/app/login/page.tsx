'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@lib/supabase/client';
import AuthContainer from '@component/AuthContainer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const supabase = createClient();
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('error', error);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
