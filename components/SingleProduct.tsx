"use client";

import style from "@/styles/singleProduct/SingleProduct.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart, FaRegHeart,FaComment } from "react-icons/fa";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "@/data/data.json";
import { useMemo, useState } from "react";

/* FIX: Slider type */
const Slider = dynamic<any>(() => import("react-slick"), {
  ssr: false,
});

/* TYPES */
type CommentMap = Record<string, string[]>;
type TextMap = Record<string, string>;
type LikeMap = Record<string, boolean>;

type ItemType = {
  name: string;
  description: string;
  person: string;
  link?: string;
  sosial?: string;
  items: {
    name: string;
    img: string;
    price: string;
  }[];
};

const getRandomItem = (items: ItemType["items"]) => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};
  
export default function SingleProductSlider() {
  const [liked, setLiked] = useState<LikeMap>({});
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<TextMap>({});
  const [comments, setComments] = useState<CommentMap>({});

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const randomizedData = useMemo(() => {
    return (data as ItemType[]).map((item) => ({
      ...item,
      randomItem: getRandomItem(item.items),
    }));
  }, []);

  const toggleLike = (key: string) => {
    setLiked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sendComment = (key: string) => {
    const text = commentText[key];
    if (!text) return;

    setComments((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), text],
    }));

    setCommentText((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return (
    <div className={style.feedContainer}>
      {randomizedData.map((item, index) => {
        const product = item.randomItem;
        const key = `${item.name}-${product.img}-${index}`;

        return (
          <div key={key} className={style.feedCard}>
            <div
              className={`${style.heart} ${liked[key] ? style.liked : ""}`}
              onClick={() => toggleLike(key)}
            >
              {liked[key] ? <FaHeart /> : <FaRegHeart />}
            </div>
              <img className={style.userImg} src={item.person} alt={item.name} />
            <div className={style.media}>
              <img src={product.img} alt={product.name} />
            </div>

            <div className={style.bottom_container}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
                <div className={style.bottom}>
                <div className={style.productInfo}>
                    <h4>{product.name}</h4>
                    <span>{product.price}</span>
                </div>

                <button>
                    Sifariş et <IoIosArrowForward />
                </button>
                </div>
            </div>

            <button className={style.actions} onClick={() => setOpenComments(key)}><FaComment /></button>
          </div>
        );
      })}

      {/* 💬 COMMENT DRAWER */}
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
              {(comments[openComments] || []).map((c: string, i: number) => (
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
