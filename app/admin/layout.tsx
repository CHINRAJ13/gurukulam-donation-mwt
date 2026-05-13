"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navItems = [
    { label: "Overview", href: "/admin" },
    { label: "Donations", href: "/admin/donations" },
    { label: "Events", href: "/admin/events" },
    { label: "Back to Site", href: "/" },
  ];

  return (
    <div className="flex min-h-screen bg-surface-dim">
      {/* Sidebar - Hide on login page */}
      {pathname !== "/admin/login" && (
      <aside className="w-64 bg-text-main text-white p-6 flex flex-col gap-8 shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">ॐ</div>
          <span className="font-display text-xl font-bold tracking-tight">Admin Portal</span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm",
                pathname === item.href
                  ? "bg-primary text-white shadow-lg"
                  : "hover:bg-white/10 text-white/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            Logout
          </button>
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold text-center">
            © {new Date().getFullYear()} Gurukulam Admin
          </div>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
