import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector, useDispatch } from "react-redux"; // Thêm useDispatch
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { getAllProductsShop } from "../redux/actions/productActions"; // Import action

const BestSellingPage = () => {
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  // Dispatch action để lấy sản phẩm
  useEffect(() => {
    dispatch(getAllProductsShop(/* sellerId ở đây nếu cần */));
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(allProducts)) {
      const sortedProducts = [...allProducts].sort(
        (a, b) => (b.sold_out || 0) - (a.sold_out || 0)
      );
      setData(sortedProducts);
      window.scrollTo(0, 0);
    }
  }, [allProducts]);

  // Log để kiểm tra trạng thái
  console.log("Loading:", isLoading);
  console.log("All Products:", allProducts);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.length > 0 ? (
                data.map((i, index) => <ProductCard data={i} key={index} />)
              ) : (
                <p className="text-center">Không có sản phẩm nào.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
