import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // 1. IMPORTE O TOASTER AQUI

export const metadata: Metadata = {
  title: "BMW Maintenance",
  description: "Sistema de gerenciamento de manutenção",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Toaster richColors position="top-right" /> {/* 2. ADICIONE O TOASTER AQUI */}
      </body>
    </html>
  );
}