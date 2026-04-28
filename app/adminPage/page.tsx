"use client";

import { useMemo } from "react";
import data from "@/data/data.json";
import styles from "@/styles/adminPage/AdminPage.module.scss";
import { IoIosArrowForward,IoIosArrowBack} from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";

type Item = {
  name: string;
  desc: string;
  price: string;
  img: string | string[];
};

type Product = {
  category: string;
  sosial: string;
  name: string;
  description: string;
  link: string;
  person: string;
  items: Item[];
};

const typedData = data as Product[];

export default function AdminPage() {
  const router = useRouter();
  const product = typedData[0];

  const renderMedia = (img: string | string[], name: string) => {
    if (Array.isArray(img)) {
      return (
        <Swiper slidesPerView={1} className={styles.slider}>
          {img.map((src, i) => (
            <SwiperSlide key={i}>
              <img src={src} className={styles.media} alt={name} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    const isVideo = img.endsWith(".mp4");

    if (isVideo) {
      return (
        <video
          src={img}
          className={styles.media}
          controls
          autoPlay
          muted
          loop
        />
      );
    }

    return <img src={img} className={styles.media} alt={name} />;
  };

  const products = useMemo(() => product.items, [product]);

  return (
    <div className={styles.wrapper}>
      <Header/>
      <HeaderMobile/>
      <p className={styles.backLink}><IoIosArrowBack /> Geri qayit</p>
      <div className={styles.header}>
        <img src={product.person} className={styles.avatar} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      </div>
      <a href={product.link} target="_blank" className={styles.link}>
        {product.sosial}-sehifesine baxis edin<IoIosArrowForward />
      </a>

      {/* PRODUCTS */}
      <div className={styles.grid}>
        {products.map((item, i) => (
          <div
              key={i}
              className={styles.card}
              onClick={() => router.push(`/products/${item.name}-${i}`)}
            >
            <div className={styles.mediaBox}>
              {renderMedia(item.img, item.name)}
            </div>

            {/* INFO */}
            <div className={styles.info}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className={styles.price}>{item.price}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}