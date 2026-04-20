"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "@/styles/registration/registration.module.scss"

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
    <div className={style.login_page}>
      
      <div className={style.glow_top} />
      <div className={style.glow_bottom} />
      
      <div className={style.login_card}>
      
        <h1 className={style.login_logo}>TrendShop</h1>
      
        <form onSubmit={handleLogin} className={style.login_form}>
      
          <input
            type="text"
            placeholder="Email, username or phone"
            className={style.login_input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Password"
            className={style.login_input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button type="submit" className={style.login_btn}>
            Log In
          </button>
        </form>
      
        <div className={style.divider}>
          <div className={style.line}></div>
          <span>OR</span>
          <div className={style.line}></div>
        </div>
      
        <button className={style.social_btn}>Continue with Google</button>
        <button className={style.social_btn}>Continue with Apple</button>
      
        <div className={style.links}>
          <Link href="/forgot">Forgot password?</Link>
          <br />
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </div>
      
      </div>
    </div>
  );
}