import React from "react";
import { useDispatch } from "react-redux";
import { addCart, removeItemCart, reduceOneCart } from "../redux/cartSlice";
import { BsEraser } from "react-icons/bs";

function CheckoutItem(props) {
  const dispatch = useDispatch();
  let item = props.item;

  const dellItem = (_name) => {
    if (window.confirm(`Are you sure you want to delete ${_name} ?`)) {
      dispatch(removeItemCart(item._id));
    }
  };

  return (
    <div className="product order">
      <div className="row">
        <div className="col-md-3">
          <img className="img-fluid mx-auto d-block image" src={item.imgUrl} />
        </div>
        <div className="col-md-8">
          <div className="info">
            <div className="row">
              <div className="col-md-5 product-name">
                <div className="product-name">
                  <div className="mt-2">{item.name}</div>
                  <div className="product-info">
                    <div>
                      Info :<span className="value"> {item.info}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-4">
                {/* add button */}
                <button
                  className="btn btn-outline-success btn-item"
                  onClick={() => dispatch(addCart(item))}
                >
                  +
                </button>
                <span className="p-1 mx-2" style={{ fontSize: "1.3em" }}>
                  {item.qty}
                </span>
                {/* reduce button */}
                <button
                  className="btn btn-outline-danger btn-item"
                  onClick={() => dispatch(reduceOneCart(item._id))}
                >
                  -
                </button>
              </div>
              <div className="col-md-2 price">
                <span>₪ {item.price}</span>
              </div>
              <div className="col-md-1 mt-4">
                <button
                  onClick={() => {
                    dellItem(item.name);
                  }}
                  className="btn btn-outline-danger"
                >
                  <BsEraser />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
