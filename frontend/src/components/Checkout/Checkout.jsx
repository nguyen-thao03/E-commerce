import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import  toast  from "react-hot-toast";

const Checkout = () => {
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [userInfo, setUserInfo] = useState(false);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    //const [zipCode, setZipCode] = useState(null);
    const [coupounCode, setCoupounCode] = useState("");
    const [coupounCodeData, setCoupounCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const paymentSubmit = () => {
        if (address1 === "" || address2 === "" || country === "" || city === "") {
            toast.error("Vui lòng chọn địa chỉ giao hàng!")
        } else {
            const shippingAddress = {
                address1,
                address2,
                //zipCode,
                country,
                city,
            };

            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user,
            }

            // update local storage with the updated orders array
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/payment");
        }
    };

    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    );

    // this is shipping cost variable
    const shipping = subTotalPrice * 0.1; // 10%

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = coupounCode;

        await axios.get(`${server}/coupoun/get-coupoun-value/${name}`).then((res) => {

            const shopId = res.data.coupounCode?.shopId;

            const coupounCodeValue = res.data.coupounCode?.value;

            if (res.data.coupounCode !== null) {
                const isCoupounValid =
                    cart && cart.filter((item) => item.shopId === shopId);

                if (isCoupounValid.length === 0) {
                    toast.error("Mã giảm giá không hợp lệ");
                    setCoupounCode("");
                } else {

                    const eligiblePrice = isCoupounValid.reduce(
                        (acc, item) => acc + item.qty * item.discountPrice,
                        0
                    );
                    const discountPrice = (eligiblePrice * coupounCodeValue) / 100;
                    setDiscountPrice(discountPrice);
                    setCoupounCodeData(res.data.coupounCode);
                    setCoupounCode("");
                }
            }
            if (res.data.coupounCode === null) {
                toast.error("Mã giảm giá không tồn tại!");
                setCoupounCode("");
            }
        });
    };

    const discountPercentenge = coupounCodeData ? discountPrice : "";

    const totalPrice = coupounCodeData
        ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
        : (subTotalPrice + shipping).toFixed(2);

    console.log(discountPercentenge);

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo
                        user={user}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        address1={address1}
                        setAddress1={setAddress1}
                        address2={address2}
                        setAddress2={setAddress2}
                        //zipCode={zipCode}
                        //setZipCode={setZipCode}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        handleSubmit={handleSubmit}
                        totalPrice={totalPrice}
                        shipping={shipping}
                        subTotalPrice={subTotalPrice}
                        coupounCode={coupounCode}
                        setCoupounCode={setCoupounCode}
                        discountPercentenge={discountPercentenge}
                    />
                </div>
            </div>
            <div
                className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className="text-white">Thanh toán</h5>
            </div>
        </div>
    );
};

const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    userInfo,
    setUserInfo,
    address1,
    setAddress1,
    address2,
    setAddress2,
    //zipCode,
    //setZipCode,
}) => {
    return (
        <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500]">Địa chỉ giao hàng</h5>
            <br />
            <form>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Tên</label>
                        <input
                            type="text"
                            value={user && user.name}
                            required
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Email</label>
                        <input
                            type="email"
                            value={user && user.email}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Số điện thoại</label>
                        <input
                            type="number"
                            required
                            value={user && user.phoneNumber}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    {/* <div className="w-[50%]">
                        <label className="block pb-2">Zip Code</label>
                        <input
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                            className={`${styles.input}`}
                        />
                    </div> */}
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Khu vực</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Chọn khu vực
                            </option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Thành phố</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Chọn thành phố
                            </option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Địa chỉ 1</label>
                        <input
                            type="address"
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Địa chỉ 2</label>
                        <input
                            type="address"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div></div>
            </form>
            <h5
                className="text-[18px] cursor-pointer inline-block"
                onClick={() => setUserInfo(!userInfo)}
            >
                Chọn từ địa chỉ đã lưu
            </h5>
            {userInfo && (
                <div>
                    {user &&
                        user.addresses.map((item, index) => (
                            <div className="w-full flex mt-1">
                                <input
                                    type="checkbox"
                                    className="mr-3"
                                    value={item.addressType}
                                    onClick={() =>
                                        setAddress1(item.address1) ||
                                        setAddress2(item.address2) ||
                                        //setZipCode(item.zipCode) ||
                                        setCountry(item.country) ||
                                        setCity(item.city)
                                    }
                                />
                                <h2>{item.addressType}</h2>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    coupounCode,
    setCoupounCode,
    discountPercentenge,
}) => {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng phụ:</h3>
                <h5 className="text-[18px] font-[600]">{subTotalPrice} vnd</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Vận chuyển:</h3>
                <h5 className="text-[18px] font-[600]">{shipping.toFixed(2)} vnd</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá:</h3>
                <h5 className="text-[18px] font-[600]">
                    - {discountPercentenge ? "vnd" + discountPercentenge.toString() : null}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">{totalPrice} vnd</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder="Coupoun code"
                    value={coupounCode}
                    onChange={(e) => setCoupounCode(e.target.value)}
                    required
                />
                <input
                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Áp dụng mã"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default Checkout;