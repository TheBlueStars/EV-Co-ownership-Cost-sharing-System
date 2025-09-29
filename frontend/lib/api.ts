import axios, { type InternalAxiosRequestConfig } from "axios";

// Tránh phụ thuộc types Node: lấy env qua globalThis
const envBase = (globalThis as any)?.process?.env?.NEXT_PUBLIC_API_BASE as string | undefined;
const baseURL = (envBase || "http://localhost:3001/api").replace(/\/$/, "");

export const api = axios.create({ baseURL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
