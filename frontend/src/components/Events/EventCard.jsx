import React, { useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Mặt hàng đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Mặt hàng được thêm vào giỏ hàng thành công!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${backend_url}${data?.images?.[0]}`} alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice} vnd
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice} vnd
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
          {data?.sold_out} đã bán
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>Xem chi tiết</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Thêm vào giỏ hàng
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
