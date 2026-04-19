import Header from "@/components/Header";
import  img from "../public/WhatsApp Image 2026-04-20 at 03.01.09.jpeg"
import style from "../styles/home/Home.module.scss"
import ProductCard from "@/components/ProductCard";



export default function Home() {
  return (
    <div className={style.HomePageContainer}>
      <Header/>
      <div className={style.HomePage}>
        <img className={style.img} src={img.src} alt="" />
      </div>
      <ProductCard/>
    </div>
  );
}
