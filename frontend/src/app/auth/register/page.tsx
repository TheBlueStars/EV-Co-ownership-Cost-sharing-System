"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "lib/api"; // nếu alias @ chưa chạy: ../../../lib/api

function usePasswordStrength(pw: string) {
  return useMemo(() => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  }, [pw]);
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const strength = usePasswordStrength(pw);
  const valid = pw.length >= 6 && pw === confirm;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) { setMsg("Mật khẩu tối thiểu 6 ký tự và phải trùng khớp."); return; }
    setBusy(true);
    setMsg(null);
    try {
      const { data } = await api.post("/auth/register", { name, email, password: pw });
      localStorage.setItem("token", data.accessToken);
      document.cookie = `token=${data.accessToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      router.push("/dashboard/co-owner");
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-300/60 via-sky/60 to-emerald-300/70 shadow-soft">
          <div className="rounded-3xl bg-white/90 backdrop-blur p-6">
            <div className="mb-5 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky text-white shadow-soft">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10z"/><path d="M4 20a8 8 0 0116 0v1H4v-1z"/>
                </svg>
              </div>
              <h1 className="mt-3 text-2xl font-bold">Tạo tài khoản</h1>
              <p className="text-sm text-slate-600">Bắt đầu quản lý đồng sở hữu xe điện chỉ với vài bước.</p>
            </div>

            {msg && (
              <div role="alert" aria-live="polite" className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {msg}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm">Họ tên</label>
                <input
                  id="name"
                  required value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 pl-10 outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M4 8l8 5 8-5v8H4z"/><path d="M4 8l8 5 8-5H4z" opacity=".3"/></svg>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pw" className="text-sm">Mật khẩu</label>
                  <div className="mt-1 relative">
                    <input
                      id="pw"
                      type={show1 ? "text" : "password"}
                      required value={pw} onChange={(e) => setPw(e.target.value)}
                      className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShow1((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={show1 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {show1 ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M2 5.27L3.28 4 20 20.72 18.73 22l-2.26-2.26A12.52 12.52 0 0112 19c-5 0-9.27-3.11-11-7a13.3 13.3 0 012.81-3.86L2 5.27z" /><path d="M12 5c5 0 9.27 3.11 11 7-1.2 2.61-3.3 4.82-5.9 6.09"/></svg>
                      )}
                    </button>
                  </div>

                  {/* strength meter */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={[
                        "h-full transition-all",
                        strength === 0 && "w-0",
                        strength === 1 && "w-1/4 bg-red-400",
                        strength === 2 && "w-2/4 bg-orange-400",
                        strength === 3 && "w-3/4 bg-yellow-400",
                        strength === 4 && "w-full bg-emerald-500",
                      ].filter(Boolean).join(" ")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm" className="text-sm">Nhập lại</label>
                  <div className="mt-1 relative">
                    <input
                      id="confirm"
                      type={show2 ? "text" : "password"}
                      required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                      className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShow2((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={show2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {show2 ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M2 5.27L3.28 4 20 20.72 18.73 22l-2.26-2.26A12.52 12.52 0 0112 19c-5 0-9.27-3.11-11-7a13.3 13.3 0 012.81-3.86L2 5.27z" /><path d="M12 5c5 0 9.27 3.11 11 7-1.2 2.61-3.3 4.82-5.9 6.09"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* checklist nhỏ */}
              <ul className="text-xs text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {[
                  { ok: pw.length >= 6, text: "Tối thiểu 6 ký tự" },
                  { ok: /[A-Z]/.test(pw) && /[a-z]/.test(pw), text: "Có cả chữ hoa & thường" },
                  { ok: /\d/.test(pw), text: "Có số" },
                  { ok: pw === confirm && pw.length > 0, text: "Khớp xác nhận" },
                ].map((c) => (
                  <li key={c.text} className="flex items-center gap-2 py-0.5">
                    <span className={`inline-grid h-4 w-4 place-items-center rounded-full ${c.ok ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                      <svg viewBox="0 0 24 24" className="h-3 w-3"><path d="M9 16.2l-3.5-3.6L4 14l5 5 11-11-1.5-1.5z" /></svg>
                    </span>
                    {c.text}
                  </li>
                ))}
              </ul>

              <button type="submit" disabled={busy} className="btn-gradient w-full disabled:opacity-60">
                {busy ? "Đang xử lý..." : "Tạo tài khoản"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="text-brand-600 hover:underline">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
