import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import NavBar from "./components/layouts/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NerdMapas",
  description: "Gerenciador de mapas by Pedro Seco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col">
      <html lang="pt-br">
        <body className="bg-neutral-900 text-white min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-1 flex flex-col">
             {children}
          </div>
        </body>
      </html>
    </div>
  );
}
