'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }

    if (password !== passwordConfirm) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // ملاحظة: هذا API مجرد مثال، عادة تستخدم API خاص بالتسجيل
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirm,
        }),
      });

      const data = await res.json();
      console.log('Response from API:', data);

      if (!res.ok) {
        setError(data.message || 'فشل إنشاء الحساب');
        setLoading(false);
        return;
      }

      router.push('/login');
    } catch (_err) {
      // استخدم _err لتجنب warning ESLint
      setError('حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-6">إنشاء حساب جديد</h1>

        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold">{error}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-700">الاسم الكامل</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="محمد أحمد"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">كلمة المرور</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block mb-1 text-gray-700">تأكيد كلمة المرور</label>
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
            } text-white py-2 rounded-lg transition`}
          >
            {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="text-amber-600 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
