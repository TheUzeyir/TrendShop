"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Mousewheel } from "swiper/modules";

import { IoIosHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";

import style from "@/styles/explore/Explore.module.scss";
import data from "@/data/data.json";
import MobileNav from "@/components/MobilNav";

export default function Explore() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState<Record<string, boolean>>({});

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const lastTap = useRef(0);

  const feed = data.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      person: cat.person,
      category: cat.category,
    }))
  );

  const toggleLike = (key: string) => {
    setLiked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setPaused((p) => ({ ...p, [index]: false }));
    } else {
      video.pause();
      setPaused((p) => ({ ...p, [index]: true }));
    }
  };

  const handleTap = (index: number, key: string) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      toggleLike(key);
    } else {
      togglePlay(index);
    }

    lastTap.current = now;
  };

  return (
    <div className={style.wrapper}>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel
        modules={[Mousewheel]}
        className={style.swiper}
      >
        {feed.map((item, i) => {
          const key = `${item.name}-${i}`;

          return (
            <SwiperSlide key={i}>
              <div className={style.card}>

                {/* 🔥 IMAGE SLIDER */}
                {Array.isArray(item.img) ? (
                  <>
                    <Swiper
                      className={style.innerSwiper}
                      onSlideChange={(swiper) => {
                        const el = document.getElementById(`progress-${i}`);
                        if (!el) return;

                        const bars = el.querySelectorAll(
                          `.${style.bar}`
                        );

                        bars.forEach((b, index) => {
                          if (index <= swiper.activeIndex) {
                            b.classList.add(style.active);
                          } else {
                            b.classList.remove(style.active);
                          }
                        });
                      }}
                    >
                      {item.img.map((img: string, idx: number) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={img}
                            className={style.media}
                            onClick={() => handleTap(i, key)}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* 🔥 CUSTOM PROGRESS */}
                    <div
                      className={style.progress}
                      id={`progress-${i}`}
                    >
                      {item.img.map((_: any, idx: number) => (
                        <div
                          key={idx}
                          className={`${style.bar} ${
                            idx === 0 ? style.active : ""
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : item.img?.includes(".mp4") ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={item.img}
                    className={style.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={() => handleTap(i, key)}
                  />
                ) : (
                  <img
                    src={item.img}
                    className={style.media}
                    onClick={() => handleTap(i, key)}
                  />
                )}

                {/* ❤️ HEART */}
                {liked[key] && (
                  <div className={style.heartPop}>
                    <IoIosHeart />
                  </div>
                )}

                {/* 👉 ACTIONS */}
                <div className={style.actions}>
                  <img src={item.person} className={style.avatar} />

                  <button
                    className={`${style.icon} ${
                      liked[key] ? style.liked : ""
                    }`}
                    onClick={() => toggleLike(key)}
                  >
                    <IoIosHeart />
                  </button>

                  <button className={style.icon}>
                    <FaComment />
                  </button>
                </div>

                {/* 📝 TEXT */}
                <div className={style.info}>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <MobileNav onProfileClick={() => console.log("profile")} />
    </div>
  );
}