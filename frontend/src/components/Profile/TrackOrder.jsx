import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/orderActions";


const TrackOrder = () => {

    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            {" "}
            <>
                {data && data?.status === "Processing" ? (
                    <h1 className="text-[20px]">Đơn hàng của bạn được xử lý tại cửa hàng.</h1>
                ) : data?.status === "Transferred to delivery partner" ? (
                    <h1 className="text-[20px]">
                        Đơn hàng của bạn đang được chuyển cho đơn vị vận chuyển.
                    </h1>
                ) : data?.status === "Shipping" ? (
                    <h1 className="text-[20px]">
                        Đơn hàng của bạn đang được vận chuyển.
                    </h1>
                ) : data?.status === "Received" ? (
                    <h1 className="text-[20px]">
                        Đơn hàng đã đến trạm giao hàng tại khu vực của bạn và sẽ được giao trong vòng 24 giờ tiếp theo.
                    </h1>
                ) : data?.status === "On the way" ? (
                    <h1 className="text-[20px]">
                        Đơn hàng sẽ sớm được giao đến bạn, vui lòng chú ý điện thoại.
                    </h1>
                ) : data?.status === "Delivered" ? (
                    <h1 className="text-[20px]">Giao hnafg thành công!</h1>
                ) : data?.status === "Processing refund" ? (
                    <h1 className="text-[20px]">Khoản tiền hoàn lại của bạn đang được xử lý!</h1>
                ) : data?.status === "Refund Success" ? (
                    <h1 className="text-[20px]">Hoàn tiền thành công!</h1>
                ) : null}
            </>

        </div>
    )
}

export default TrackOrder