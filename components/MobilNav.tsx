"use client";
import style from "@/styles/header/header.module.scss";
import { useRouter } from "next/navigation";
import { FaHome, FaUser } from "react-icons/fa";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { FaPlus } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";

interface Props {
  onProfileClick: () => void;
}
 
export default function MobileNav({ onProfileClick }: Props) {
  const router = useRouter();

  return (
    <div>
      <div className={style.mobileNav}>
        <button onClick={() => router.push("/")}>
          <FaHome />
          <span>Home</span>
        </button>

        <button onClick={() => router.push("/explore")}>
          <SiGoogledisplayandvideo360/>
          <span>Explore</span>
        </button>
        
        <button onClick={() => router.push("/productAdd")}>
          <FaPlus/>
          <span>Create</span>
        </button>

        <button onClick={() => router.push("/messages")}>
          <BiSolidMessageRounded/>
          <span>Messages</span>
        </button>

        <button onClick={onProfileClick}>
          <FaUser />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}