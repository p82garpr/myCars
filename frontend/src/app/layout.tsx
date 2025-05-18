import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "../styles/theme.css";
import { Topbar } from "@/shared/components/Topbar";
import { Footer } from "@/shared/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MyCars",
  description: "Descubre nuestra exclusiva selección de vehículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geist.className}>
      <body>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Topbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
