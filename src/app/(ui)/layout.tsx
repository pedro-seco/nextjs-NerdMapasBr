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
    <div className="h-screen w-full flex flex-col p-5">
      <NavBar/>
      <html lang="pt-br">
        <body
          className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden antialiased`}
        >
          {children}
        </body>
      </html>
    </div>
  );
}
