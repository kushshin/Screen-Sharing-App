import type { Metadata } from "next";
import { AuthProvider } from "@/Context/AuthContext";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";




export const metadata: Metadata = {
  title: "Screen Share App",
  description: "Screen Share Test app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
  
    >
      <body
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
