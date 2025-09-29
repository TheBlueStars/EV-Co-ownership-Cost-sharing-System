"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "lib/api"; // nếu alias @ chưa chạy: ../../../lib/api

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard/co-owner";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.accessToken);
      // cookie cho middleware (nếu dùng)
      document.cookie = `token=${data.accessToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      router.push(next);
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Đăng nhập thất bại, vui lòng kiểm tra lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="w-full max-w-md">
        {/* khung viền gradient + glass */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-emerald-300/70 via-sky/60 to-indigo-300/50 shadow-soft">
          <div className="rounded-3xl bg-white/90 backdrop-blur p-6">
            <div className="mb-5 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky text-white shadow-soft">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                </svg>
              </div>
              <h1 className="mt-3 text-2xl font-bold">Đăng nhập</h1>
              <p className="text-sm text-slate-600">Truy cập hệ thống đồng sở hữu & chia sẻ chi phí xe điện.</p>
            </div>

            {msg && (
              <div role="alert" aria-live="polite" className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {msg}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 pl-10 outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M4 8l8 5 8-5v8H4z"/><path d="M4 8l8 5 8-5H4z" opacity=".3"/></svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm">Mật khẩu</label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {show ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M2 5.27L3.28 4 20 20.72 18.73 22l-2.26-2.26A12.52 12.52 0 0112 19c-5 0-9.27-3.11-11-7a13.3 13.3 0 012.81-3.86L2 5.27z" /><path d="M12 5c5 0 9.27 3.11 11 7-1.2 2.61-3.3 4.82-5.9 6.09"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  Ghi nhớ tôi
                </label>
                <Link href="/auth/forgot" className="text-brand-600 hover:underline">Quên mật khẩu?</Link>
              </div>

              <button type="submit" disabled={busy} className="btn-gradient w-full disabled:opacity-60">
                {busy ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>

            {/* Social (placeholder) */}
            <div className="mt-4">
              <div className="relative my-3 text-center text-xs text-slate-500">
                <span className="bg-white px-3 relative z-10">Hoặc</span>
                <div className="absolute left-0 right-0 top-1/2 -z-0 h-px bg-slate-200" />
              </div>
              <button
                type="button"
                className="w-full rounded-xl border bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 31.7 29.5 35 24 35c-6.6 0-12-5.4-12-12S17.4 11 24 11c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.3 5.7 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 14.7 19 11 24 11c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.3 5.7 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.4-5.2C29.5 35 27 36 24 36c-5.4 0-9.9-3.6-11.3-8H6.2c1.8 8.3 9.2 16 17.8 16z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3C34.8 31.7 30.8 36 24 36c-6.6 0-12-5.4-12-12S17.4 11 24 11c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.3 5.7 29.5 4 24 4c-7.7 0-14.4 4.6-17.7 11.1l6.6 4.8C14.7 14.7 19 11 24 11z"/></svg>
                Tiếp tục với Google
              </button>
            </div>

            <p className="mt-4 text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" className="text-brand-600 hover:underline">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
