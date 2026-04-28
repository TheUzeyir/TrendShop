"use client";
import style from "@/styles/header/header.module.scss";
import { useRouter } from "next/navigation";
import { FaHome, FaUser } from "react-icons/fa";
import data from "@/data/data.json";
import { FaPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
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

        <button onClick={() => router.push("/messages")}>
          <BiSolidMessageRounded/>
          <span>Messages</span>
        </button>

        <button onClick={() => router.push("/create")}>
          <FaPlus/>
          <span>Create</span>
        </button>

        <button onClick={onProfileClick}>
          <FaUser />
          <span>Profile</span>
        </button>

        <button onClick={() => router.push("/settings")}>
          <IoSettings/>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}