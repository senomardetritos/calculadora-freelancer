import React from 'react'
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.MONGO_DB_APP_NAME ? process.env.MONGO_DB_APP_NAME : "CalcFreela",
  description: "Calculadora para freelancers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('AppName: ' + process.env.MONGO_DB_APP_NAME)
  return (
    <html lang="en">
      <body className={roboto.variable} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}
