import React from 'react'
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { MongoDB } from '@/lib/mongodb';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalcFreela",
  description: "Calculadora para freelancers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const mongoose = await MongoDB()
  // console.log()
  return (
    <html lang="en">
      <body className={roboto.variable} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}
