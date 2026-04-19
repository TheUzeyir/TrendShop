"use client";

import style from "@/styles/header/header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Product Detail", path: "/products" },
    { name: "Orders", path: "/order" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <div className={style.header_container}>
      <div className="container">
        <div className={style.header}>
          <h1 className={style.logo}>TrendShop</h1>

          <div className={style.nav}>
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
          </div>
        </div>
      </div>
    </div>
  );
}