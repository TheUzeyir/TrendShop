"use client";
import { useMemo, useState } from "react";
import style from "@/styles/SimpleProduct/SimpleProduct.module.scss";
import { IoIosHeart } from "react-icons/io";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "@/data/data.json";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function SimpleProduct() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1080, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const toggleLike = (key: string) => {
  setLiked((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

  const products = useMemo(() => {
    return data.flatMap((item) =>
      item.items.map((p) => ({
        ...p,
        owner: item.name,
      }))
    );
  }, []);

  return (
    <div className={style.wrapper}>
      <Slider {...settings}>
        {products.map((product, idx) => (
          <div key={idx} className={style.card}>
            
            {/* IMAGE */}
            <div className={style.imageBox}>
              <img src={product.img} alt={product.name} />

              <button
  className={style.heart}
  onClick={() => toggleLike(product.img + product.name)}
>
  <IoIosHeart
    style={{
      color: liked[product.img + product.name] ? "red" : "white",
    }}
  />
</button>
            </div>

            {/* CONTENT */}
            <div className={style.content}>
              
              <div className={style.top}>
                <h3>{product.name}</h3>
                <span>{product.price}</span>
              </div>

              <p className={style.owner}>{product.owner}</p>

              <button className={style.button}>
                Sifariş et
              </button>

            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
}