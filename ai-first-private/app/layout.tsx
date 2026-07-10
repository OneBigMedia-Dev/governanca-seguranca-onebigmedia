import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI First Privado - One Big Media",
  description: "Área privada do programa AI First.",
  icons: {
    icon: "/onebigmedia%20logo.png"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
