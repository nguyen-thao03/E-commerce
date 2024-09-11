import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Bộ sưu tập tốt nhất cho <br /> Trang trí nhà cửa
        </h1>
        <p className="pt-5 tetx-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Bộ sưu tập trang trí nhà cửa của chúng tôi mang đến sự kết hợp hoàn
          hảo giữa phong cách hiện đại và tinh tế, giúp không gian sống trở nên
          ấm cúng và đầy cảm hứng.
        </p>
        <Link to="/products" className="inline-block">
        <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
                Mua ngay
            </span>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
