"use client";

import { useMemo, useState } from "react";
import style from "@/styles/SimpleProduct/SimpleProduct.module.scss";
import { IoIosHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "@/data/data.json";
import { Product } from "@/types/index";
import type { Settings } from "react-slick";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

type CommentMap = Record<string, string[]>;
type TextMap = Record<string, string>;
type FollowMap = Record<string, boolean>;
type LikeMap = Record<string, boolean>;

const typedData = data as Product[];

export default function SimpleProduct() {
  const [liked, setLiked] = useState<LikeMap>({});
  const [followed, setFollowed] = useState<FollowMap>({});
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<TextMap>({});
  const [comments, setComments] = useState<CommentMap>({});

  const toggleLike = (key: string) => {
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFollow = (key: string) => {
    setFollowed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sendComment = (key: string) => {
    const text = commentText[key];
    if (!text?.trim()) return;

    setComments((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), text],
    }));

    setCommentText((prev) => ({
      ...prev,
      [key]: "", 
    }));
  };

  const renderMedia = (media: string | string[], name: string) => {
    const src = Array.isArray(media) ? media[0] : media;

    if (!src) return null;

    const isVideo = /\.(mp4|webm|ogg)$/i.test(src);

    if (isVideo) {
      return (
        <video
          src={src}
          className={style.media}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <img
        src={src}
        alt={name}
        className={style.media}
      />
    );
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

  const categorySettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 968,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
    ],
  };

const sliderSettings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,

  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: "unslick" as const,
    },
  ],
};

  return (
    <div className={style.container}>
      {/* CATEGORY SLIDER */}
      <Slider {...categorySettings} className={style.productCardCategory}>
        {typedData.map((item, idx) => (
          <div key={item.category ?? idx} className={style.categoryItem}>
            <p>{item.category}</p>
          </div>
        ))}
      </Slider>
      <p className={style.simpleProductTitle}>Tovsiyye Edilenler</p>

      {/* PRODUCT SLIDER */}
      <Slider {...sliderSettings}>
        {products.map((product, idx) => {
          const key = `${product.name}-${idx}`;

          return (
            <div key={key} className={style.card}>
              <div className={style.imageBox}>                
                {renderMedia(product.img, product.name)}
                <div className={style.rightBar}>
                  <img className={style.avatar} src={product.person} />
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

                  <button
                    className={style.commentBtn}
                    onClick={() =>
                      setOpenComments(openComments === key ? null : key)
                    }
                  >
                    <FaComment />
                  </button>
                </div>

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
          );
        })}
      </Slider>

      {/* COMMENTS MODAL */}
      {openComments && (
        <div
          className={style.commentOverlay}
          onClick={() => setOpenComments(null)}
        >
          <div
            className={style.commentSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.commentHeader}>
              <h3>Comments</h3>
              <button onClick={() => setOpenComments(null)}>✖</button>
            </div>

            <div className={style.commentList}>
              {(comments[openComments] || []).length === 0 && (
                <p className={style.empty}>No comments yet</p>
              )}

              {(comments[openComments] || []).map((c, i) => (
                <div key={i} className={style.commentItem}>
                  {c}
                </div>
              ))}
            </div>

            <div className={style.commentInput}>
              <input
                placeholder="Write a comment..."
                value={commentText[openComments] || ""}
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [openComments]: e.target.value,
                  })
                }
              />

              <button onClick={() => sendComment(openComments)}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}