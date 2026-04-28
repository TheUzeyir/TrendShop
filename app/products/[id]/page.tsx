"use client";

import { useParams, useRouter } from "next/navigation";
import data from "@/data/data.json";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "@/styles/detailProduct/DetailProduct.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  /* FLATTEN DATA */
  const products = useMemo(() => {
    return data.flatMap((item) =>
      item.items.map((p, idx) => ({
        ...p,
        owner: item.name,
        person: item.person,
        category: item.category,
        social: item.sosial,
        link: item.link,
        id: `${p.name}-${idx}`,
      }))
    );
  }, []);

  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  /* MEDIA */
  const media = Array.isArray(product.img)
    ? product.img
    : [product.img];

  const isVideo = (src: string) =>
    /\.(mp4|webm|ogg)$/i.test(src);

  const getFirstMedia = (img: string | string[]) =>
    Array.isArray(img) ? img[0] : img;

const related = products
  .filter(
    (p) =>
      p.category?.toLowerCase().trim() ===
        product.category?.toLowerCase().trim() &&
      p.id !== product.id
  )
  .slice(0, 15);

const sellerProducts = products
  .filter(
    (p) => p.owner === product.owner && p.id !== product.id
  )
  .slice(0, 15);
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <HeaderMobile />

      {/* BACK */}
      <p
        className={styles.backLink}
        onClick={() => router.back()}
      >
        <IoIosArrowBack /> Geri qayıt
      </p>

      {/* TOP */}
      <div className={styles.top}>
        {/* LEFT MEDIA */}
        <div className={styles.mediaBox}>
          <Swiper slidesPerView={1} spaceBetween={10}>
            {media.map((m, i) => (
              <SwiperSlide key={i}>
                {isVideo(m) ? (
                  <video
                    src={m}
                    controls
                    className={styles.media}
                  />
                ) : (
                  <img
                    src={m}
                    className={styles.media}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT INFO */}
        <div className={styles.info}>
          <h2>{product.name}</h2>
          <p>{product.desc}</p>

          <h3 className={styles.price}>
            {product.price}
          </h3>

          <p><b>Owner:</b> {product.owner}</p>
          <p><b>Category:</b> {product.category}</p>

          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
          >
            {product.social}
          </a>

          <button className={styles.orderBtn}>
            Sifariş et
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className={styles.relatedSection1}>
        <div className={styles.relatedHeader}>
          <h3>Oxşar məhsullar</h3>
          <button>butun mehsullara bax</button>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => {
            const src = getFirstMedia(item.img);

            return (
              <div
                key={item.id}
                className={styles.card}
                onClick={() =>
                  router.push(`/product/${item.id}`)
                }
              >
                {isVideo(src) ? (
                  <video
                    src={src}
                    className={styles.cardMedia}
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={src}
                    className={styles.cardMedia}
                  />
                )}

                <div className={styles.cardInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELLER PRODUCTS */}
      {sellerProducts.length > 0 && (
        <div className={styles.relatedSection2}>
          <div className={styles.relatedHeader}>
            <h3>Saticinin digər məhsulları</h3>
            <button>butun mehsullara bax</button>
          </div>
          <div className={styles.relatedGrid}>
            {sellerProducts.map((item) => {
              const src = getFirstMedia(item.img);

              return (
                <div
                  key={item.id}
                  className={styles.card}
                  onClick={() =>
                    router.push(`/product/${item.id}`)
                  }
                >
                  {isVideo(src) ? (
                    <video
                      src={src}
                      className={styles.cardMedia}
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={src}
                      className={styles.cardMedia}
                    />
                  )}
                  <div className={styles.cardInfo}>
                    <h4>{item.name}</h4>
                    <p>{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}