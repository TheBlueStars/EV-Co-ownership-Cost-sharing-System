// src/app/page.tsx
import Link from "next/link";
export const metadata = {
  title: "EV Co-ownership – Trang chủ",
  description: "Nền tảng quản lý đồng sở hữu & chia sẻ chi phí xe điện.",
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-sky text-white shadow-soft">
      {children}
    </div>
  );
}

export default function Page() {
  const features = [
    {
      title: "Đăng ký & xác thực",
      desc: "Tải CMND/CCCD, GPLX; duyệt nhanh, an toàn.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4 4h16v16H4z" opacity=".2" />
          <path d="M8 8h8v2H8zm0 4h10v2H8zm0 4h6v2H8z" />
        </svg>
      ),
    },
    {
      title: "Lịch công bằng",
      desc: "Ưu tiên theo % sở hữu & lịch sử sử dụng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M7 2v3M17 2v3" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="3" y="5" width="18" height="16" rx="2" opacity=".2" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Chia chi phí minh bạch",
      desc: "Theo % sở hữu hoặc theo mức sử dụng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M3 12a9 9 0 1018 0H12V3a9 9 0 00-9 9z" opacity=".2" />
          <path d="M12 12l9 0" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Quỹ chung & bỏ phiếu",
      desc: "Số dư, lịch sử chi; biểu quyết minh bạch.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4 7h16v10H4z" opacity=".2" />
          <path d="M4 7l8 5 8-5" />
        </svg>
      ),
    },
    {
      title: "Báo cáo trực quan",
      desc: "Biểu đồ chi phí, thời gian sử dụng.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4 20h16" stroke="currentColor" strokeWidth="2" />
          <rect x="6" y="10" width="3" height="8" rx="1" />
          <rect x="11" y="6" width="3" height="12" rx="1" />
          <rect x="16" y="12" width="3" height="6" rx="1" />
        </svg>
      ),
    },
    {
      title: "Check-in/out bằng QR",
      desc: "Nhận/trả xe nhanh, có chữ ký số.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM15 15h4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ============== HERO đẹp + nền động ============== */}
      <section className="relative overflow-hidden">
        {/* Vệt sáng + blob */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-300/40 via-sky/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-sky/30 to-brand-300/30 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/70 backdrop-blur border shadow-soft">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Ra mắt bản Beta – dùng thử miễn phí
            </span>

            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Quản lý đồng sở hữu xe điện{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-sky to-emerald-600">
                minh bạch & mượt mà
              </span>
            </h1>

            <p className="text-slate-600 max-w-xl">
              Đặt lịch công bằng theo tỉ lệ sở hữu, chia chi phí tự động, quỹ chung rõ ràng và báo cáo trực quan – tất cả trong một nền tảng.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/auth/register" className="btn-gradient">Bắt đầu ngay</Link>
              <Link href="/auth/login" className="btn-outline">Đăng nhập</Link>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { k: "3 phút", v: "Onboarding" },
                { k: "100%", v: "Minh bạch chi phí" },
                { k: "24/7", v: "Theo dõi realtime" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-white/80 backdrop-blur border text-center p-3 shadow-soft">
                  <div className="text-lg font-extrabold">{s.k}</div>
                  <div className="text-[11px] text-slate-500">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card lịch demo – viền gradient, hiệu ứng nổi */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand-200/60 to-sky/40 blur-3xl animate-float" />
            <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-emerald-300/60 via-sky/50 to-indigo-300/50 shadow-soft">
              <div className="rounded-3xl bg-white/90 backdrop-blur p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-semibold">Lịch xe – Tuần này</div>
                  <span className="text-xs text-slate-500">demo</span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                    <div key={d} className="text-slate-500">{d}</div>
                  ))}
                  {Array.from({ length: 21 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-14 rounded border transition-all duration-300 ${
                        i % 7 === 4
                          ? "bg-brand-50 border-brand-200 hover:bg-brand-100"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded bg-brand-200 ring-1 ring-brand-300" />
                    Slot đã đặt
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded bg-white ring-1 ring-slate-200" />
                    Slot trống
                  </span>
                </div>
              </div>

              {/* viền glow khi hover */}
              <div className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-emerald-400/40 via-sky/40 to-indigo-400/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURE GRID ============== */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Tính năng nổi bật</h2>
            <p className="text-slate-600">Thiết kế cho đồng sở hữu – minh bạch, tiện lợi và công bằng.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200/60 to-white">
                <div className="card relative !p-5">
                  <div className="mb-3">
                    <Icon>{f.icon}</Icon>
                  </div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-sm text-slate-600">{f.desc}</div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/60 group-hover:ring-emerald-200 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS (Timeline) ============== */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Bắt đầu trong 3 bước</h2>

          <div className="relative grid gap-6 md:grid-cols-3">
            {/* line for mobile */}
            <div className="absolute left-4 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-emerald-200 via-sky/40 to-transparent md:hidden" />
            {[
              {
                step: "01",
                title: "Tạo nhóm & mời thành viên",
                desc: "Nhập email, thiết lập tỉ lệ sở hữu và gửi lời mời.",
              },
              {
                step: "02",
                title: "Ký e-contract & xác thực",
                desc: "Quy ước dùng xe, chi phí chung, đồng thuận minh bạch.",
              },
              {
                step: "03",
                title: "Đặt lịch & theo dõi",
                desc: "Chốt lịch công bằng, chia chi phí tự động, báo cáo realtime.",
              },
            ].map((s, idx) => (
              <div key={s.step} className="relative rounded-2xl border bg-white p-6 shadow-soft">
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                    {s.step}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{s.title}</span>
                </div>
                <p className="text-sm text-slate-600">{s.desc}</p>

                {/* connector line for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute right-[-22px] top-9 h-[2px] w-8 bg-gradient-to-r from-emerald-200 via-sky/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CTA cuối ============== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border bg-white p-8 md:p-10 shadow-soft">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-300/40 to-sky/30 blur-2xl" />
            <div className="pointer-events-none absolute -left-20 bottom-[-40px] h-64 w-64 rounded-full bg-gradient-to-br from-sky/30 to-emerald-300/40 blur-2xl" />

            <div className="md:flex items-center gap-8">
              <div className="md:flex-1">
                <h3 className="text-2xl font-bold">Sẵn sàng quản lý xe điện hiệu quả?</h3>
                <p className="mt-2 text-slate-600">
                  Tạo nhóm, cấu hình tỉ lệ sở hữu, mời thành viên và bắt đầu đặt lịch ngay hôm nay.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Link href="/auth/register" className="btn-gradient">Đăng ký miễn phí</Link>
                <Link href="/auth/login" className="btn-outline">Tôi đã có tài khoản</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
