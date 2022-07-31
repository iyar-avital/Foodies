import React, { useEffect, useState } from "react";
import { API_URL, doApiMethod } from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "./checkoutItem";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { PayPalButton } from "react-paypal-button-v2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./checkout.css";
import { resetCart } from "../redux/cartSlice";
import AuthClientComp from "../auth/authClientComp";

function Checkout(props) {
  const { cart_ar, totalPrice, store_id } = useSelector((state) => state.cart);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const disabledBtn = () => {
    //  disable paypal btns
    if (cart_ar.length === 0) {
      return {
        opacity: "0.6",
        pointerEvents: "none",
      };
    }
    return {};
  };

  useEffect(() => {
    if (cart_ar.length) {
      doApiAddToCheckout();
    }
  }, [cart_ar]);

  const dellAll = () => {
    if (window.confirm("Are you sure you want to delete all ?")) {
      dispatch(resetCart());
    }
  };

  const doApiAddToCheckout = async () => {
    // add to checkout
    let url = API_URL + "/orders";
    // console.log(cart_ar);
    // console.log(totalPrice);
    let body = {
      total_price: totalPrice,
      products_ar: cart_ar,
      store_short_id: store_id,
    };
    console.log(body);
    let resp = await doApiMethod(url, "POST", body);
    console.log(resp.data);
  };

  // paypal pay
  const onCommit = async (_data) => {
    console.log(_data);
    let url = API_URL + "/orders/orderPaid/";
    let paypalObject = {
      tokenId: _data.facilitatorAccessToken,
      orderId: _data.orderID,
      realPay: "sandbox", //if yes is real
    };
    let resp = await doApiMethod(url, "PATCH", paypalObject);
    if (resp.data.modifiedCount == 1) {
      toast.success("Your order completed successfully");
      dispatch(resetCart());
      nav("/oldOrders");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
        duration: 0.7,
      }}
      className="container mt-5"
      style={{
        minHeight: "85vh",
      }}
    >
      <AuthClientComp />
      <div></div>
      <section className="shopping-cart">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {/* start product */}
                  {cart_ar.length == 0 ? (
                    <h2 className="text-center mt-5">
                      Cart is empty <MdOutlineRemoveShoppingCart className="mx-2" />
                    </h2>
                  ) : (
                    ""
                  )}
                  {cart_ar.map((item) => {
                    return <CheckoutItem key={item._id} item={item} />;
                  })}
                  {/* end product */}
                </div>
              </div>
              {/* start Checkout */}
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3> Summary </h3>
                  <div className="summary-item">
                    <span className="text"> Tip </span>
                    <span className="price"> It 's up to you.</span>
                  </div>
                  <div className="summary-item">
                    <span className="text"> Delivery </span>
                    <span className="price"> ₪{cart_ar.length == 0 ? 0 : 20} </span>
                  </div>
                  <div className="summary-item">
                    <span className="text"> Total </span>
                    <span className="price"> ₪{totalPrice} </span>
                  </div>
                  {cart_ar.length > 0 ? (
                    <button onClick={dellAll} className="btn btn-outline-danger col-12 my-5">
                      Delete all Products
                    </button>
                  ) : (
                    ""
                  )}
                  <div style={disabledBtn()}>
                    <PayPalButton
                      amount={totalPrice}
                      options={{
                        clientId:
                          "ATRPIUvU2B6lrdeCovo7c4NzauAsSjlElL4xi_BaxHyCrrcmAO_fjdCddURxRhRPcq9W9hBQpnxjBzMD",
                        currency: "ILS",
                      }}
                      onSuccess={(details, data) => {
                        // data - have info of pay token to check in nodejs
                        // console.log("data", data);
                        // details have info about the buyer
                        // console.log("details", details);
                        // if payment success ,
                        if (data.orderID) {
                          onCommit(data);
                        }
                      }}
                      onCancel={(err) => {
                        toast.error("Process end before payment. Please try again");
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* end Checkout */}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Checkout;
