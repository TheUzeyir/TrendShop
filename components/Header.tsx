"use client";

import { useEffect, useState } from "react";
import style from "@/styles/header/header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/order" },
  ];

    const handleAdminClick = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    router.push("/admin");
  };


  return (
    <header
      className={`${style.header_container} ${
        scrolled ? style.scrolled : ""
      }`}
    >
      <div className="container">
        <div className={style.header}>
          <h1 className={style.logo} onClick={() => router.push("/")}>
            TrendShop
          </h1>

          <nav className={style.nav}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${style.nav_link} ${
                    isActive ? style.active : ""
                  }`}
                >
                  {item.name}
                  <span className={style.underline}></span>
                </Link>
              );
            })}
            <div
              onClick={handleAdminClick}
              className={`${style.nav_link} ${
                pathname === "/admin" ? style.active : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              Profile
              <span className={style.underline}></span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}