import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link, useLocation } from "wouter";

interface OcatLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/dashboard", label: "BOARD", icon: "⬛" },
  { href: "/analytics", label: "ANALYTICS", icon: "◈" },
  { href: "/operators", label: "OPERATORS", icon: "◉" },
  { href: "/matrix", label: "MATRIX", icon: "▦" },
  { href: "/profile", label: "PROFILE", icon: "◎" },
];

export default function OcatLayout({ children }: OcatLayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const statsQuery = trpc.reports.stats.useQuery();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-black text-white border-r-4 border-black fixed h-full z-40">
        <div className="p-6 border-b-2 border-white/20">
          <Link href="/dashboard">
            <div className="cursor-pointer">
              <div className="text-3xl font-black tracking-tighter leading-none">OCAT</div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-white/50 mt-1 uppercase">
                Ontario Casino Accountability
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = location === item.href || location.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 font-black text-xs tracking-widest uppercase cursor-pointer transition-all ${
                    active
                      ? "bg-[oklch(0.75_0.18_85)] text-black"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <div className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">Active Alerts</div>
          <div className="text-3xl font-black text-[oklch(0.75_0.18_85)]">
            {statsQuery.data?.total ?? "—"}
          </div>
          <div className="mt-4 text-[10px] font-mono text-white/40 truncate">{user?.name ?? user?.email}</div>
          <button
            onClick={logout}
            className="mt-2 text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest"
          >
            Sign Out →
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white flex items-center justify-between px-4 py-3 border-b-4 border-[oklch(0.75_0.18_85)]">
        <Link href="/dashboard">
          <span className="text-xl font-black tracking-tighter cursor-pointer">OCAT</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[oklch(0.75_0.18_85)]">
            {statsQuery.data?.total ?? 0} ALERTS
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white font-black text-lg"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black text-white pt-16">
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 font-black text-sm tracking-widest uppercase cursor-pointer border-b border-white/10 ${
                      active ? "text-[oklch(0.75_0.18_85)]" : "text-white/70"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              );
            })}
            <div className="pt-6">
              <div className="text-[10px] font-mono text-white/40 mb-1">{user?.name ?? user?.email}</div>
              <button onClick={logout} className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest">
                Sign Out →
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
