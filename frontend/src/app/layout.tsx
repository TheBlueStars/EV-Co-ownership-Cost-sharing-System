import "@/styles/globals.css";
import Navbar from "src/app/components/Navbar";

export const metadata = {
  title: "EV Co-ownership",
  description: "Quản lý đồng sở hữu & chia sẻ chi phí xe điện.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#f7f9fb] text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
