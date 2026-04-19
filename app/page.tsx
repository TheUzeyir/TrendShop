import Header from "@/components/Header";
import  img from "../public/cd99b263-8ec1-4c5b-b408-7857f26e1854.png"
import style from "../styles/home/Home.module.scss"
import ProductCard from "@/components/ProductCard";



export default function Home() {
  return (
    <div className={style.HomePageContainer}>
      <Header/>
      <div className={style.HomePage}>
        <img className={style.img} src={img.src} alt="" />
        <h2 className={style.MainText}>Trend Məhsullar <br /> Sizi Gözləyir!</h2>
        <button className={style.btn}>Mehsullara Bax</button>
      </div>
      <ProductCard/>
    </div>
  );
}
