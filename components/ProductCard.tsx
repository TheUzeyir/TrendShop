'use client'
import style from '@/styles/productCard/ProductCard.module.scss'
import { FaInstagram, FaTiktok, FaLink } from "react-icons/fa";
import img from "../public/ChatGPT Image Apr 20, 2026, 02_37_41 AM.png"
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductCard() {

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const products = [
    {
      name: "Alex Sunglasses",
      description: "This is the description for Product",
      image: img.src,
      imageProduct: img.src,
      productName: "Product 1",
      productPrice: "$99.99",
      link: "https://www.instagram.com/product1"
    },
    {
      name: "Product 2",
      description: "This is the description for Product",
      image: img.src,
      imageProduct: img.src,
      productName: "Product 2",
      productPrice: "$149.99",
      link: "https://www.instagram.com/product2"
    },
    {
      name: "Product 3",
      description: "This is the description for Product ",
      image: img.src,
      imageProduct: img.src,
      productName: "Product 3",
      productPrice: "$199.99",
      link: "https://www.instagram.com/product3"
    },
    {
      name: "Product 4",
      description: "This is the description for Product",
      image: img.src,
      imageProduct: img.src,
      productName: "Product 4",
      productPrice: "$249.99",
      link: "https://www.instagram.com/product4"
    }
  ];

  return (
    <Slider {...settings} className={style.productCard}>
      
      {products.map((item, index) => (
        <div key={index} className={style.card}>
          
          <div className={style.productCard_head}>
            <img className={style.productImage} src={item.image} alt={item.name} />
            <h2 className={style.productName}>{item.name}</h2>
            <p className={style.productDescription}>{item.description}</p>
            <a href={item.link} target="_blank">
              <button className={style.instagramButton}>Instagram Məhsul Linki</button>
            </a>
          </div>

          <div className={style.productCard_main}>
            <div className={style.productCard_main_card}>
                <img src={item.imageProduct} alt={item.productName} />
                <h3 className={style.productName}>{item.productName}</h3>
                <p className={style.productPrice}>{item.productPrice}</p>
              <button className={style.productCard_main_card_btn}>
                Sifariş Et <IoIosArrowForward/>
              </button>
            </div>
          </div>

          <div className={style.productCard_footer}>
            <button>
              Bütün məhsullara bax <IoIosArrowForward />
            </button>

            <FaInstagram className={`${style.icon} ${style.insta}`} />
            <FaTiktok className={`${style.icon} ${style.tiktok}`} />
            <FaLink className={`${style.icon} ${style.link}`} />
          </div>

        </div>
      ))}

    </Slider>
  )
}