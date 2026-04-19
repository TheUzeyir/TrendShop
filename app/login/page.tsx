"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (login && password) {
      console.log("Login:", { login, password });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🔥 Gradient Glow Background (TikTok vibe) */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          TrendShop
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Login */}
          <input
            type="text"
            placeholder="Email, username or phone"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Social login */}
        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-3 hover:bg-white/10 transition">
          Continue with Google
        </button>

        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
          Continue with Apple
        </button>

        {/* Links */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <Link href="/forgot" className="block mb-2 hover:text-white">
            Forgot password?
          </Link>

          Don’t have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}