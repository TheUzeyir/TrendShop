"use client";

import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { IoIosHeart } from "react-icons/io";
import data from "@/data/data.json";
import style from "@/styles/centeredSlider/CenteredSlider.module.scss";

export default function CenteredSlider() {
  const [liked, setLiked] = useState({});
  const [followed, setFollowed] = useState({});

  const toggleLike = (key) => {
    setLiked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleFollow = (key) => {
    setFollowed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const products = useMemo(() => {
    return data.flatMap((item) =>
      item.items.map((p) => ({
        ...p,
        owner: item.name,
        person: item.person,
      }))
    );
  }, []);
 
  return (
    <div className={style.container}>
      <p className={style.sliderText}>Ən çox alınanlar</p>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={12}
        centeredSlides={false}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((product, idx) => {
          const key = `${product.img}-${product.name}-${idx}`;

          return (
            <SwiperSlide key={key}>
              <div className={style.card}>
                <div className={style.imageBox}>
                <img
                  src={Array.isArray(product.img) ? product.img[0] : product.img} alt={product.name}/>
                  <div className={style.topBar}>
                    <img
                      className={style.avatar}
                      src={product.person}
                      alt="user"
                    />
                    <button
                      className={style.heart}
                      onClick={() => toggleLike(key)}
                    >
                      <IoIosHeart
                        style={{
                          color: liked[key] ? "red" : "white",
                        }}
                      />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className={style.content}>
                    <div className={style.left}>
                      <p className={style.owner}>{product.owner}</p>
                      <h3>{product.name}</h3>
                    </div>

                    <div className={style.right}>
                      <button
                        className={`${style.followBtn} ${
                          followed[key] ? style.following : ""
                        }`}
                        onClick={() => toggleFollow(key)}
                      >
                        {followed[key] ? "Following" : "Follow"}
                      </button>

                      <span className={style.price}>
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}