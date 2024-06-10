"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { cartContext } from "./_context/CartContext";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useState } from "react";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <cartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </cartContext.Provider>
    </ClerkProvider>
  );
}
