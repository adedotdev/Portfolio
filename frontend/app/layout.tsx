import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteTitle = "Dami's Portfolio";

export const metadata: Metadata = {
  title: siteTitle,
  description: profile.tagline,
  metadataBase: new URL("https://dami-adenugba.vercel.app"),
  openGraph: {
    title: siteTitle,
    description: profile.tagline,
    url: "https://dami-adenugba.vercel.app",
    siteName: siteTitle,
    images: profile.photo ? [profile.photo] : [],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.tagline,
    images: profile.photo ? [profile.photo] : [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
