"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  Users,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Nav definitions per role ─────────────────────────────────────────────────
// In a real app these would be derived from session role.
// We expose all sections with section headers for demo.

const NAV_SECTIONS = [
  {
    label: "Tutor",
    items: [
      { href: "/tutor", label: "Overview", icon: LayoutDashboard },
      { href: "/tutor/leads", label: "Incoming Leads", icon: BookOpen },
      { href: "/tutor/profile", label: "My Profile", icon: UserCircle },
    ],
  },
  {
    label: "Parent",
    items: [
      { href: "/parent", label: "Overview", icon: LayoutDashboard },
      { href: "/parent/leads", label: "My Requests", icon: BookOpen },
    ],
  },
  {
    label: "Admin",
    items: [
      { href: "/admin", label: "Overview", icon: Users },
      { href: "/admin/verify", label: "Verify Tutors", icon: ShieldCheck },
    ],
  },
];

function NavItem({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base tracking-tight">
            Find<span className="text-primary">My</span>Tutor
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-1.5">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavItem key={item.href} {...item} onClick={onClose} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 border-r bg-background flex-col shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-background border-r shadow-2xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b bg-background flex items-center px-4 gap-3 sticky top-0 z-40">
          <button
            id="mobile-nav-toggle"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <button
            className="text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
          </button>
          {/* Mock avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
