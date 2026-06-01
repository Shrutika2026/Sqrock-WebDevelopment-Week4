"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface NavUser {
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<NavUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setUser(data.user))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const studentLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/coding", label: "Coding", icon: Code2 },
    { href: "/tests", label: "Online Tests", icon: HelpCircle },
    { href: "/certificates", label: "Certificates", icon: GraduationCap },
  ];

  const instructorLinks = [
    { href: "/instructor", label: "Dashboard", icon: LayoutDashboard },
    { href: "/instructor/courses", label: "My Courses", icon: BookOpen },
    { href: "/instructor/students", label: "Students", icon: User },
  ];

  const links =
    user?.role === "instructor" || user?.role === "admin"
      ? instructorLinks
      : user
        ? studentLinks
        : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">
            Code<span className="text-brand-600">Learn</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {!user && (
            <>
              <Link
                href="/courses"
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === "/courses" && "text-brand-600"
                )}
              >
                Courses
              </Link>
              <Link
                href="/coding"
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname.startsWith("/coding") && "text-brand-600"
                )}
              >
                Coding Practice
              </Link>
              <Link
                href="/tests"
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname.startsWith("/tests") && "text-brand-600"
                )}
              >
                Online Tests
              </Link>
            </>
          )}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === link.href && "text-brand-600 bg-brand-50 dark:bg-brand-950"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className="btn-secondary px-4 py-2">
                Login
              </Link>
              <Link href="/register" className="btn-primary px-4 py-2">
                Get Started
              </Link>
            </div>
          )}

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 px-4 py-4 md:hidden dark:border-gray-800">
          {!user && (
            <>
              <Link href="/courses" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Courses
              </Link>
              <Link href="/coding" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Coding Practice
              </Link>
            </>
          )}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="mt-2 block py-2 text-sm font-medium text-red-600">
              Logout
            </button>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/login" className="btn-secondary" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link href="/register" className="btn-primary" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
