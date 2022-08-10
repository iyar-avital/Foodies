import React, { useEffect, useRef, useState } from "react";
import LottieAnimation from "../../comps/misc/lottieAnimation";
import OrderInfo from "../../comps/orders/OrderInfo";
import { API_URL, doApiGet } from "../../services/apiService";
import OrderItem from "./orderItem";

function OrdersAdmin(props) {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const selectRef = useRef();

  const [show, setShow] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    doApi();
  }, [status]);

  const doApi = async () => {
    let ordersUrl = API_URL + `/orders/allOrders?perPage=9999&status=${status}`;
    try {
      let respOrders = await doApiGet(ordersUrl);
      let filterPending = respOrders.data;
      setAr(filterPending);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectOption = () => {
    let status_val = selectRef.current.value;
    setStatus(status_val);
  };

  return (
    <>
      <OrderInfo handleToggle={handleToggle} show={show} item={orderInfo} />;
      <div className="container">
        <h2 className="display-4">Orders list</h2>
        {/* filter orders by the status */}
        <div className="my-5 col-md-3 position-absolute top-0 end-0">
          <select ref={selectRef} onChange={onSelectOption} className="form-select">
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        {ar.length === 0 && !loading ? (
          <h2 className="display-4 text-center mt-5">No Orders found</h2>
        ) : (
          <table className="table table-striped table-scrollbar mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Date Time</th>
                <th>Total price</th>
                <th>Products</th>
                <th>Info / Del</th>
              </tr>
            </thead>
            <tbody>
              {ar.map((item, i) => {
                return (
                  <OrderItem
                    key={item._id}
                    item={item}
                    index={i}
                    doApi={doApi}
                    handleToggle={handleToggle}
                    setOrderInfo={setOrderInfo}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        {loading && <LottieAnimation />}
      </div>
    </>
  );
}

export default OrdersAdmin;