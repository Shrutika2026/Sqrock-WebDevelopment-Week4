import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import RefreshHandler from "@/components/RefreshHandler";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = {
  title: "CodeLearn - AI-Powered LMS & Coding Platform",
  description:
    "Learn coding with AI-powered courses, live code editor, quizzes, and certificates. The modern learning platform for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <RefreshHandler />
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "dark:bg-gray-800 dark:text-white",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
