"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Mousewheel } from "swiper/modules";
import { IoIosHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";

import style from "@/styles/explore/Explore.module.scss";
import data from "@/data/data.json";
import MobileNav from "@/components/MobilNav";
import HeaderMobile from "@/components/HeaderMobile";

export default function Explore() {
  const feed = data.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      person: cat.person,
      category: cat.category,
    }))
  );

  return (
    <div className={style.wrapper}>
    <HeaderMobile/>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className={style.swiper}
      >
        {feed.map((item, i) => (
          <SwiperSlide key={i}>
            <div className={style.card}>

              {/* MEDIA */}
              {Array.isArray(item.img) ? (
                <img
                  src={item.img[0]}
                  className={style.media}
                  alt={item.name}
                />
              ) : item.img?.includes(".mp4") ? (
                <video
                  src={item.img}
                  className={style.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.img}
                  className={style.media}
                  alt={item.name}
                />
              )}

              {/* RIGHT ACTIONS */}
              <div className={style.actions}>
                <img
                  src={item.person}
                  className={style.avatar}
                  alt="avatar"
                />

                <button className={style.icon}>
                  <IoIosHeart />
                </button>

                <button className={style.icon}>
                  <FaComment />
                </button>
              </div>

              {/* TEXT */}
              <div className={style.info}>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* MOBILE NAV */}
      <MobileNav onProfileClick={() => console.log("profile")} />

    </div>
  );
}