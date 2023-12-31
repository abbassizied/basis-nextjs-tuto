/*
 * A layout is UI that is shared between routes.
 * A root layout is the top-most layout in the root app directory.
 * The root layout must define <html> and <body> tags and other globally shared UI.
 *
 */

import "./globals.css";
// import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// Header is a Client Component
import Header from "@components/header/Header";
// Footer is a Client Component
import Footer from "@components/footer/Footer";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// RootLayout is a Server Component by default
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Header />
        </div>
        {
          /*
 <Suspense fallback={<Loading />}></Suspense>
          */
        }
       
          <div className="content">{children}</div>
        
        <div className="footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
