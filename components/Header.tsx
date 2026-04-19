"use client";

import style from "@/styles/header/header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

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
    <header className={style.header_container}>
      <div className="container">
        <div className={style.header}>

          {/* LOGO */}
          <h1
            className={style.logo}
            onClick={() => router.push("/")}
          >
            TrendShop
          </h1>

          {/* NAV */}
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

            {/* ADMIN */}
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