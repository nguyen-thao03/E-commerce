import React from "react";
import styles from "../../styles/styles";

export const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv6paRN6aeyopjOiOq3zYZXJJFtRsHSIIvfw&s"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://dwglogo.com/wp-content/uploads/2015/11/Dell-Logo-White-Background.png"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EGH9NzPEzAuWylV8ZXvIMkjzeREkutu0wQ&s"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVyaQFFTjBR4iYkS-OomqFOdmMpHEbhmLaQ&s"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt253Qlda-6a5x8LltLHZD4IWMCmk7LOQ9Q&s"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
