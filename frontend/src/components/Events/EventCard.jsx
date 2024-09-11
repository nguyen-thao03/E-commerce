import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://cdn.viettelstore.vn/Images/Product/ProductImage/66855595.jpeg"
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 15 128GB</h2>
        <p>
          iPhone 15 128GB năm nay mang đến trải nghiệm cầm nắm cực kỳ tốt, có
          thể nói tốt nhất trong 4 phiên bản iPhone 15 Series bởi trọng lượng
          chỉ 171 gram. So với iPhone 14 Pro nặng 206 gram, iPhone 15 128 GB nhẹ
          hơn 35 gram. Ngoài ra, các cạnh viền iPhone 15 cũng được bo góc mềm
          mại hơn so với phiên bản tiền nhiệm, tạo cảm giác thoải mái khi cầm,
          không còn cấn tay giống như iPhone 14 Pro.
        </p>
        <div className="flex py-2 justify-between">
            <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    27.000.000 vnd
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    24.000.000 vnd
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                120 đã bán
            </span>
        </div>
        <CountDown/>
      </div>
    </div>
  );
};

export default EventCard;
