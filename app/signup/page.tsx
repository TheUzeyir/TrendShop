"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "@/styles/registration/registration.module.scss"

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [login, setLogin] = useState(""); // email / username / phone
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !login || !password) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Register:", { name, login, password });

    router.push("/login");
  };

  return (
    <div className={style.register_page}>
      
      <div className={style.glow_top} />
      <div className={style.glow_bottom} />
      
      <div className={style.register_card}>
      
        <h1 className={style.title}>Create Account</h1>
        <p className={style.subtitle}>Join TrendShop</p>
      
        <form onSubmit={handleRegister} className={style.form}>
      
          <input
            type="text"
            placeholder="Full name"
            className={style.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
    
          <input
            type="text"
            placeholder="Email, username or phone"
            className={style.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Password"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Confirm password"
            className={style.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
    
          <button type="submit" className={style.btn}>
            Sign Up
          </button>
        </form>
      
        <div className={style.divider}>
          <div className={style.line}></div>
          <span>OR</span>
          <div className={style.line}></div>
        </div>
      
        <button className={style.social_btn}>Continue with Google</button>
        <button className={style.social_btn}>Continue with Apple</button>
      
        <div className={style.footer}>
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </div>
      
      </div>
    </div>
  );
}