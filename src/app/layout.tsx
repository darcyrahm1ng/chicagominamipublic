import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chicago Minami Dojo | Miyama Ryu Combat Jujutsu",
  description:
    "Train with Grandmaster Diane Wallander at Chicago Minami Dojo in Flossmoor. Miyama Ryu Combat Jujutsu classes for all levels. $99 trial offer.",
  authors: [{ name: "Chicago Minami Dojo" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Chicago Minami Dojo | Miyama Ryu Combat Jujutsu",
    description: "Train with Grandmaster Diane in Flossmoor. $99 trial offer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
