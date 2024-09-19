import React, { useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/eventActions";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllEvents());
  }, [dispatch]);

  const addToCartHandler = (event) => {
    if (!event) {
      toast.error("Sản phẩm không tồn tại!");
      return;
    }

    const isItemExists = cart && cart.find((i) => i._id === event._id);
    if (isItemExists) {
      toast.error("Mặt hàng đã có trong giỏ hàng!");
    } else if (!event.stock || event.stock < 1) {
      toast.error("Sản phẩm đã hết hàng!");
    } else {
      const cartData = { ...event, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Mặt hàng được thêm vào giỏ hàng thành công!");
    }
  };

  // Xử lý khi không có dữ liệu sự kiện
  if (!data) {
    return (
      <h2 className="text-center text-red-500">
        Không có sự kiện nào để hiển thị!
      </h2>
    );
  }

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={data?.images?.length ? `${backend_url}${data.images[0]}` : "fallback-image-url"}
          alt={data.name || "Sự kiện"}
          className="rounded-lg"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle}`}>{data.name || "Tên sự kiện"}</h2>
        <p>{data.description || "Mô tả sự kiện"}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice ? `${data.originalPrice} vnd` : "Giá gốc không có"}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice ? `${data.discountPrice} vnd` : "Giá khuyến mãi không có"}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out ? `${data.sold_out} đã bán` : "0 đã bán"}
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>Xem chi tiết</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5 cursor-pointer`}
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
