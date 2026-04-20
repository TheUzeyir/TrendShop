import Header from "@/components/Header";
import  img from "../public/ChatGPT Image Apr 20, 2026, 05_42_06 PM.png"
import style from "../styles/home/Home.module.scss"
import ProductCard from "@/components/ProductCard";
import { GiShoppingBag } from "react-icons/gi";
import { FaShopify } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FcAdvertising } from "react-icons/fc";
import { BiSolidShoppingBags } from "react-icons/bi";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={style.HomePageContainer}>
      <Header/>
      <div className={style.HomePage}>
        <div className="HomePage_imgBox">
          <img className={style.img} src={img.src} alt="" />
            <div className={style.MainText}>
              <p className={style.MainText_item1}>Instagram & TikTok</p>
              <p className={style.MainText_item2}>Satış Platformanız</p>
              <p className={style.MainText_item3}>İnstagram və TikTok'da satış edin,<br />biznesinizi büyüdün!</p>
            </div>
            <button className={style.HomePage_imgBoxbtn1}>Mağazaya Başla</button>
            <button className={style.HomePage_imgBoxbtn2}>Demo İzləyin</button>
        </div>
      <ProductCard/>
        <div className="container">
          <div className={style.servicesBox}>
            <h2>Xidmətlərimiz</h2>
            <div className={style.servicesBox_cards}>
                <div className={style.servicesBox_card_item}>
                  <GiShoppingBag className={style.servicesBox_card_item_icon}/>
                  <h3>Özəl Mağaza</h3>
                  <p className={style.servicesBox_card_item_description}>Instagram və TikTok'da öz mağazanızı yaradın, məhsullarınızı sərgiləyin və satışa başlayın.</p>
                </div>
                <div className={style.servicesBox_card_item}>
                  <SiCashapp className={style.servicesBox_card_item_icon}/>
                  <h3>Ödəniş Qapısı</h3>
                  <p className={style.servicesBox_card_item_description}  >Güvənli və sürətli ödəniş qapısı ilə müştərilərinizin alış-veriş təcrübəsini artırın.</p>
                </div>
                <div className={style.servicesBox_card_item}>
                  <FcAdvertising className={style.servicesBox_card_item_icon}/>
                  <h3>Reklam Xidmətləri</h3>
                  <p className={style.servicesBox_card_item_description}>Instagram və TikTok reklam kampaniyaları ilə hədəf kütlənizə effektiv şəkildə çatın.</p>
                </div>
                <div className={style.servicesBox_card_item}>
                  <FaShopify className={style.servicesBox_card_item_icon}/>
                  <h3>Asand Satış</h3>
                  <p className={style.servicesBox_card_item_description}>Instagram və TikTok'da satışlarınızı asanlaşdırın və müştərilərinizin alışveriş təcrübəsini artırın.</p>
                </div>
                <div className={style.servicesBox_card_item}>
                  <BiSolidShoppingBags className={style.servicesBox_card_item_icon}/>
                  <h3>Güvənli Alış</h3>
                  <p className={style.servicesBox_card_item_description}>Instagram və TikTok'da güvənli və sürətli alışveriş təcrübəsi yaşayın.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
