import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanyam-portfolio.vercel.app"),
  title: "Sanyam Gairola | Java Developer & Tech Enthusiast",
  description: "Portfolio of Sanyam Gairola, a passionate Java Developer and Tech Enthusiast specializing in scalable software solutions.",
  keywords: ["Java Developer", "Software Engineer", "React", "Next.js", "Portfolio", "Sanyam Gairola"],
  authors: [{ name: "Sanyam Gairola" }],
  openGraph: {
    title: "Sanyam Gairola | Java Developer",
    description: "Building scalable solutions with Java and Modern Web Technologies.",
    url: "https://your-portfolio-url.com", // Placeholder
    siteName: "Sanyam Gairola Portfolio",
    images: [
      {
        url: "/pp.jpeg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
