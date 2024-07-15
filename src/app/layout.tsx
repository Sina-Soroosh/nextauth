import IranSansFont from "@/helpers/IranSansFont";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={IranSansFont.className}>{children}</body>
    </html>
  );
}
