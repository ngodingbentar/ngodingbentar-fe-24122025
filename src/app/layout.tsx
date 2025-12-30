import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Rental Lensa - Ngodingbentar",
  description: "dewaqintoro@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center w-full min-h-screen bg-white">
        <div className="w-full max-w-6xl px-4 md:px-0">
          <Header />
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}
