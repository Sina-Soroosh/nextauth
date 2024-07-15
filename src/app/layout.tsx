import "./globals.css";
import IranSansFont from "@/helpers/IranSansFont";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={IranSansFont.className}>
      <body
        className={" bg-[url(./../../public/images/bg.jpeg)] bg-cover bg-black"}
      >
        {children}
      </body>
    </html>
  );
}
