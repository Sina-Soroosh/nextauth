import NextAuthProvider from "@/helpers/NextAuthProvider";
import "./globals.css";
import IranSansFont from "@/helpers/IranSansFont";

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
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
