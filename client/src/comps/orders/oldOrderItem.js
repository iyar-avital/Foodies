import React from "react";
import { Link } from "react-router-dom";
import { ImInfo } from "react-icons/im";

function oldOrderItem(props) {
  let item = props.item;
  let i = props.i;
  let handleToggle = props.handleToggle;
  let setOrderInfo = props.setOrderInfo;

  return (
    <div className="product order">
      <div className="col-md-12">
        <div className="info">
          <div className="row">
            <div className="col-md-3 product-name">
              <div className="mt-2 text-center mt-5">{i + 1}</div>
            </div>
            <div className="col-md-6 product-name">
              <div className="product-name">
                <div className="product-info">
                  <div>
                    Status :<span className="value"> {item.status}</span>
                  </div>
                </div>
                <div className="product-info">
                  <div>
                    Total Price :<span className="value"> ₪ {item.total_price}</span>
                  </div>
                </div>
                <div className="product-info">
                  <div>
                    Date :<span className="value"> {props.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center pt-5 product-name">
              <button
                className="animaLinkSM text-black"
                onClick={() => {
                  setOrderInfo(item);
                  handleToggle();
                }}
              >
                More info <ImInfo className="mx-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default oldOrderItem;
