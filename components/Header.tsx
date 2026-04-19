"use client";

import style from "@/styles/header/header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  name: string;
  image: string;
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);

  // user-i oxu
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ADMIN CLICK (ƏSAS LOGIC)
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
      setOpen((prev) => !prev);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/order" },
  ];

  return (
    <div className={style.header_container}>
      <div className="container">
        <div className={style.header}>
          <h1 className={style.logo}>TrendShop</h1>

          <div className={style.nav}>
            {/* NORMAL NAV */}
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
            <div className={style.admin_wrapper}>
              <Link
                href="/admin"
                onClick={handleAdminClick}
                className={`${style.nav_link} ${
                  pathname === "/admin" ? style.active : ""
                }`}
              >
                Admin
                <span className={style.underline}></span>
              </Link>

              {open && user && (
                <div className={style.dropdown}>
                  <div className={style.user_info}>
                    <img src={user.image} alt="" />
                    <p>{user.name}</p>
                  </div>

                  <Link href="/myproduct">Mənim elanlarım</Link>
                  <Link href="/favorite">Bəyənilmişlər</Link>

                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                      setOpen(false);
                      router.push("/");
                    }}
                  >
                    Çıxış
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}