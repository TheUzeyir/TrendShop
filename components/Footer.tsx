"use client";

import React from "react";
import style from "@/styles/footer/Footer.module.scss";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={style.footer}>

      <div className={style.footer_container}>

        {/* LOGO */}
        <div className={style.col}>
          <h2 className={style.logo}>TrendShop</h2>
          <p>
            Premium products and modern shopping experience.
            Best quality, best price.
          </p>
        </div>

        {/* LINKS */}
        <div className={style.col}>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/order">Orders</a>
          <a href="/admin">Admin</a>
        </div>

        {/* SOCIAL */}
        <div className={style.col}>
          <h3>Follow Us</h3>

          <div className={style.social}>
            <a href="https://instagram.com/theuzeyir_" target="_blank">
              <FaInstagram />
            </a>

            <a href="https://tiktok.com/@theuzeyir_" target="_blank">
              <FaTiktok />
            </a>
          </div>

          <p className={style.creator}>
            Created by <span>Uzeyir Mammadov</span>
          </p>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/994507970044?text=Salam%20Uzeyir,%20sizinle%20elaqe%20saxlamaq%20isteyirem"
            target="_blank"
            className={style.phone}
          >
            <FaWhatsapp />(+99450-797-00-44)
          </a>
        </div>

        {/* NEWSLETTER */}
        <div className={style.col}>
          <h3>Newsletter</h3>
          <p>Get latest updates</p>

          <div className={style.newsletter}>
            <input type="email" placeholder="Enter email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={style.bottom}>
        © {new Date().getFullYear()} TrendShop. All rights reserved.
      </div>

    </footer>
  );
}