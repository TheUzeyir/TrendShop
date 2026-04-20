"use client";

import style from "@/styles/productCard/ProductCard.module.scss";
import { FaInstagram, FaTiktok, FaLink } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "@/data/data.json";
import { Product, ProductItem } from "@/types/index";

const typedData = data as Product[];

// random 5 item seç
const getRandomItems = (items: ProductItem[]) => {
  return [...items].sort(() => 0.4 - Math.random()).slice(0, 4);
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
  };

  return (
    <div className="container">
      <div className={style.ProductCardContainer}>

        {/* CATEGORY SLIDER */}
        <Slider {...categorySettings} className={style.productCardCategory}>
          {typedData.map((item, index) => (
            <div key={index} className={style.categoryItem}>
              <p>{item.category}</p>
            </div>
          ))}
        </Slider>

        {/* PRODUCT SLIDER */}
        <Slider {...settings} className={style.productCard}>

          {typedData.map((item, index) => (
            <div key={index} className={style.card}>

              {/* HEAD */}
              <div className={style.productCard_head}>
                <img
                  className={style.productImage}
                  src={item.person}
                  alt={item.name}
                />

                <h2 className={style.productName}>{item.name}</h2>
                <p className={style.productDescription}>{item.description}</p>

                <a href={item.link} target="_blank">
                  <button className={style.instagramButton}>
                    Instagram Məhsul Linki
                  </button>
                </a>
              </div>

              {/* MAIN */}
              <div className={style.productCard_main}>

                {getRandomItems(item.items).map((product, i) => (
                <div className={style.productCard_main_card}>
                    <img src={product.img} alt={product.name} />

                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.price}</p>
                    </div>

                    <button>
                      Sifariş Et <IoIosArrowForward />
                    </button>
                  </div>
                ))}

              </div>

              {/* FOOTER */}
              <div className={style.productCard_footer}>
                <button>
                  Bütün məhsullara bax <IoIosArrowForward />
                </button>
                <div className={style.productCard_footer_navigateBox}>
                  <FaInstagram className={style.productCard_footer_navigateBox_icon} />
                  <FaTiktok className={`${style.icon} ${style.tiktok}`} />
                  <FaLink className={`${style.icon} ${style.link}`} />
                </div>
              </div>

            </div>
          ))}

        </Slider>
      </div>
    </div>
  );
}