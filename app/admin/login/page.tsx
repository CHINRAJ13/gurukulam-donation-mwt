"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-dim p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-primary/10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">ॐ</div>
          <h1 className="text-2xl font-bold text-text-main">Admin Portal</h1>
          <p className="text-text-muted text-sm mt-2">Sign in to manage the Gurukulam</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-main mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
