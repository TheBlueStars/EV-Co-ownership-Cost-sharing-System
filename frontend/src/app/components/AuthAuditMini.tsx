"use client";
import { useEffect, useState } from "react";
import { api } from "lib/api";
import { getAuthEvents } from "@/lib/authEvents";

function fmt(t?: string | Date | null) {
  if (!t) return "—";
  const d = typeof t === "string" ? new Date(t) : t;
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

type Me = { email: string; createdAt?: string; lastLoginAt?: string; loginCount?: number };

export default function AuthAuditMini() {
  const [me, setMe] = useState<Me | null>(null);
  const [localLast, setLocalLast] = useState<string | null>(null);

  useEffect(() => {
    api.get("/users/me").then(({ data }) => setMe(data)).catch(() => {});
    const ev = getAuthEvents().find(e => e.type === 'login');
    setLocalLast(ev?.at ?? null);
  }, []);

  return (
    <div className="rounded-xl border bg-white p-4 text-sm text-slate-700">
      <div className="font-semibold mb-2">Hoạt động tài khoản</div>
      <div className="grid gap-1">
        <div>Đã đăng ký: <span className="font-medium">{fmt(me?.createdAt)}</span></div>
        <div>Đăng nhập gần nhất: <span className="font-medium">{fmt(me?.lastLoginAt || localLast)}</span></div>
        <div>Tổng số lần đăng nhập: <span className="font-medium">{me?.loginCount ?? "—"}</span></div>
      </div>
    </div>
  );
}
