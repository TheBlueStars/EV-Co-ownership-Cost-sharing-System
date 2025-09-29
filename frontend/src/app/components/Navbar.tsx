"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/dashboard/co-owner", label: "Co-owner" },
  { href: "/dashboard/staff", label: "Staff" },
  { href: "/dashboard/admin", label: "Admin" },
  { href: "/schedule", label: "Lịch" },
  { href: "/payments", label: "Thanh toán" },
  { href: "/reports", label: "Báo cáo" },
  { href: "/groups", label: "Nhóm" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // đóng menu khi đổi route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const itemClass = (active: boolean) =>
    [
      "px-3 py-1.5 rounded-xl transition will-change-transform",
      "hover:bg-slate-100 hover:-translate-y-[1px]",
      active ? "bg-slate-100 font-medium text-slate-900" : "text-slate-700",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition",
        scrolled
          ? "bg-white/80 backdrop-blur border-b border-white/60 shadow-[0_10px_30px_rgba(0,0,0,.06)]"
          : "bg-transparent border-transparent",
      ].join(" ")}
      role="banner"
    >
      {/* vệt gradient dưới đáy */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"
        aria-hidden
      />

      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3" aria-label="Primary">
        {/* Brand */}
        <Link href="/" className="group inline-flex items-center gap-2 font-extrabold">
          <span className="inline-grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-brand-500 to-sky text-white shadow-soft">
            {/* Logo chữ E */}
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path d="M5 6h14v2H7v4h10v2H7v4h12v2H5z" fill="currentColor" />
            </svg>
          </span>
          <span className="tracking-tight">
            <span className="text-emerald-600">EV</span>{" "}
            <span className="text-slate-900">Co-ownership</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="ml-2 hidden md:flex items-center gap-1 text-sm">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={itemClass(active)}>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Link href="/auth/login" className="btn-outline">Đăng nhập</Link>
          <Link href="/auth/register" className="btn-gradient">Đăng ký</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl md:hidden border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {!open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          <span className="sr-only">Mở menu</span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
          <div className="grid">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    active ? "bg-slate-100 font-medium text-slate-900" : "hover:bg-slate-50 text-slate-700",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/auth/login" className="btn-outline w-full text-center">Đăng nhập</Link>
            <Link href="/auth/register" className="btn-gradient w-full text-center">Đăng ký</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
