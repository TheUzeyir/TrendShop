"use client";
import { useEffect, useState } from "react";
import style from "@/styles/header/header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import MobileNav from "./MobilNav";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/adminPage" },
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

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
    setQuery("");
    setMobileSearchOpen(false);
  };

  return (
    <>
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
            <form onSubmit={handleSearch} className={style.searchBox}>
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={style.searchInput}
              />
              <button type="submit" className={style.searchButton}>
                <IoSearch />
              </button>
            </form>
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
              >
                Profile
                <span className={style.underline}></span>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <MobileNav onProfileClick={handleAdminClick} />
    </>
  );
}