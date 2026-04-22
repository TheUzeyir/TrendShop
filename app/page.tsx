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
import { FaStore, FaShareAlt } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdEmail, MdPhone } from "react-icons/md";
import SingleProductSlider from "@/components/SingleProduct";
import SimpleProduct from "@/components/SimpleProduct";

export default function Home() {
  return (
    <div className={style.HomePageContainer}>
      <Header/>
      <div className={style.HomePage}>
        <div className={style.HomePage_imgBox}>
          <img className={style.img} src={img.src} alt="" />

          <div className={style.content}>
            <div className={style.MainText}>
              <p className={style.MainText_item1}>Instagram & TikTok</p>
              <p className={style.MainText_item2}>Satış Platformanız</p>
              <p className={style.MainText_item3}>
                İnstagram və TikTok'da satış edin,<br />
                biznesinizi büyüdün!
              </p>
            </div>

            <div className={style.buttons}>
              <button className={style.HomePage_imgBoxbtn1}>
                Mağazaya Başla
              </button>
              <button className={style.HomePage_imgBoxbtn2}>
                Demo İzləyin
              </button>
            </div>
          </div>
        </div> 
      <SingleProductSlider/>
      <SimpleProduct/>
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
          <div className={style.howItWorks}>
              <h2 className={style.howItWorks_title}>Necə İşləyir?</h2>
              <div className={style.howItWorks_cards}>
                <div className={style.howItWorks_card}>
                  <span className={style.step}>1</span>
                  <MdEmail className={style.howItWorks_icon} />
                  <h3>Qeydiyyatdan keçin</h3>
                  <p>Email ilə asan qeydiyyatdan keçin və platformaya daxil olun.</p>
                </div>

                <div className={style.howItWorks_card}>
                  <span className={style.step}>2</span>
                  <FaStore className={style.howItWorks_icon} />
                  <h3>Mağaza yaradın</h3>
                  <p>Məhsullarınızı əlavə edin və öz mağazanızı qurun.</p>
                </div>

                <div className={style.howItWorks_card}>
                  <span className={style.step}>3</span>
                  <FaShareAlt className={style.howItWorks_icon} />
                  <h3>Paylaş və tag et</h3>
                  <p>Instagram və TikTok-da paylaşaraq müştərilərə çatın.</p>
                </div>

                <div className={style.howItWorks_card}>
                  <span className={style.step}>4</span>
                  <BiMoneyWithdraw className={style.howItWorks_icon} />
                  <h3>Qazanc əldə et</h3>
                  <p>Satışlardan qazanc əldə edin və biznesinizi böyüdün.</p>
                </div>
              </div>
            </div>
            <div className={style.contactBox}>
                <h2 className={style.contactBox_title}>Bizimlə Əlaqə</h2>

                <form className={style.contactBox_form}>

                  <div className={style.form_group}>
                    <input type="text" required />
                    <label>Adınız</label>
                  </div>

                  <div className={style.form_group}>
                    <input type="email" required />
                    <label>Email ünvanınız</label>
                  </div>

                  <div className={style.form_group}>
                    <textarea rows={5} required></textarea>
                    <label>Müraciətinizi yazın</label>
                  </div>

                  <button type="submit" className={style.contactBox_btn}>
                    Göndər
                  </button>

                </form>
              </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
