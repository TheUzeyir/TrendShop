"use client";

import style from "@/styles/productCard/ProductCard.module.scss";
import { FaInstagram, FaTiktok, FaLink } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "@/data/data.json";
import { Product, ProductItem } from "@/types/index";
import { useMemo } from "react";

// 🔥 IMPORTANT: SSR disabled (fixes hydration error)
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const typedData = data as Product[];

// ✅ stable shuffle (NO Math.random)
const getRandomItems = (items: ProductItem[]) => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = (i * 31 + 7) % (i + 1); // deterministic pseudo-random
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, 4);
};
 
export default function ProductCard() {
  const categorySettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,

  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const getSocialIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "instagram":
      return <FaInstagram />;
    case "tiktok":
      return <FaTiktok />;
    default:
      return <FaLink />;
  }
};

  // ✅ stable once-only data
  const randomizedData = useMemo(() => {
    return typedData.map((item) => ({
      ...item,
      randomItems: getRandomItems(item.items),
    }));
  }, []);

  return (
      <div className={style.ProductCardContainer}>

        {/* CATEGORY SLIDER */}
        <Slider {...categorySettings} className={style.productCardCategory}>
          {typedData.map((item, idx) => (
            <div key={item.category ?? idx} className={style.categoryItem}>
              <p>{item.category}</p>
            </div>
          ))}
        </Slider>

        {/* PRODUCT SLIDER */}
        <Slider {...settings} className={style.productCard}>
          {randomizedData.map((item) => (
            <div
              key={`${item.name}-${item.link}`}
              className={style.card}
            >

              {/* HEAD */}
              <div className={style.productCard_head}>
                <img
                  className={style.productImage}
                  src={item.person}
                  alt={item.name}
                />

                <h2 className={style.productName}>{item.name}</h2>
                <p className={style.productDescription}>
                  {item.description}
                </p>

                <a href={item.link} target="_blank" rel="noreferrer">
                  <button className={style.instagramButton}>
                    {item.sosial} Linki
                  </button>
                </a>
              </div>

              {/* MAIN */}
              <div className={style.productCard_main}>
                {item.randomItems.map((product, idx) => (
                  <div
                    key={`${item.name}-${product.name}-${idx}`}
                    className={style.productCard_main_card}
                  >
                    <img src={product.img} alt={product.name} />

                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className={style.productCard_footer}>
                <button>
                  Bütün məhsullara bax <IoIosArrowForward />
                </button>
              </div>

            </div>
          ))}
        </Slider>

      </div>
  );
}