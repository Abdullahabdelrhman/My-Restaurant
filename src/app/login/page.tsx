"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "فشل تسجيل الدخول");
        setLoading(false);
        return;
      }

      if (!data.token) {
        setError("لم يتم استلام رمز الدخول");
        setLoading(false);
        return;
      }

      // حفظ التوكن
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChanged"));

      router.push("/menu");
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-6">
          تسجيل الدخول
        </h1>

        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-amber-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            } text-white py-2 rounded-lg transition`}
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-amber-600 hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
