import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import { ImInfo } from "react-icons/im";
import OldOrderInfoItem from "./oldOrderInfoItem";

function OldOrderInfoClient(props) {
  let [productsAr, setProductsAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let [orderDate, setOrderDate] = useState("");
  let params = useParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.idOrder;
    let resp = await doApiGet(url);
    // defiendDate
    let date = resp.data.date_created.replace("T", " ");
    date = date.substring(0, date.indexOf(":") + 3);
    setOrderDate(date);
    setOrderInfo(resp.data);
    setProductsAr(resp.data.products_ar);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="container mt-5"
      style={{ minHeight: "85vh" }}
    >
      {/* <AuthClientComp /> */}
      <section className="shopping-cart">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {/* start product */}
                  {productsAr.length == 0 ? (
                    <h2 className="text-center mt-5">
                      You have not ordered yet...
                      {/* <GrDeliver className="mx-2" /> */}
                    </h2>
                  ) : (
                    ""
                  )}
                  {productsAr.map((item, i) => {
                    return <OldOrderInfoItem key={item._id} item={item} i={i} />;
                  })}
                  {/* end product */}
                </div>
              </div>
              {/* start Orders Info */}
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  {orderInfo.total_price ? (
                    <React.Fragment>
                      <h3>
                        Order Info <ImInfo className="mx-2" />
                      </h3>
                      <div className="summary-item">
                        <span className="text">Order Number</span>
                        <span className="price">{orderInfo?.short_id}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Status</span>
                        <span className="price">{orderInfo.status}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Date</span>
                        <span className="price">{orderDate}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Items</span>
                        <span className="price">{productsAr.length}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Total price</span>
                        <span className="price">₪ {orderInfo.total_price}</span>
                      </div>
                      {/* <div className="summary-item">
                        <span className="text">Address</span>
                        <span className="price"> {orderInfo.destination.label}</span>
                      </div> */}
                    </React.Fragment>
                  ) : (
                    <h2 className="text-center">Loading...</h2>
                  )}
                  <div className="summary-item">
                    <Link className="btn btn-outline-info col-12 mt-5" to="/oldOrders/">
                      back to list
                    </Link>
                  </div>
                </div>
              </div>
              {/* end Orders Info */}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default OldOrderInfoClient;
