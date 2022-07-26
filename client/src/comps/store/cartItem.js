import React from "react";
import { useDispatch } from "react-redux";
import { BsEraser } from "react-icons/bs";
import { addCart, reduceOneCart, removeItemCart } from "../redux/cartSlice";

function CartItem(props) {
  const dispatch = useDispatch();
  let item = props.item;
  let i = props.i;

  return (
    <div className="product order border rounded-4 mb-2 text-center">
      <div className="row">
        <div className="col-md-1 product-name d-flex align-items-center pe-3">
          <div style={{ fontWeight: "bold" }} className="item-number">
            {i + 1}
          </div>
        </div>
        <div className="col-md-3">
          <img className="img-fluid mx-auto d-block image" src={item.imgUrl} />
        </div>
        <div className="col-md-3">
          <div className="info">
            <div className="row" style={{ fontWeight: "bold" }}>
              <div className="mt-3 product-name">
                <div className="product-name">
                  <div className="mt-2">{item.name}</div>
                </div>
              </div>
              <div className="mt-2 text-success">
                <span>₪ {item.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 item-btns d-flex align-items-center">
          {/* add button */}
          <button
            className="btn btn-outline-success btn-item"
            title="Add"
            onClick={() => dispatch(addCart(item))}
          >
            +
          </button>
          <span className="mx-2" style={{ fontSize: "1.2em" }}>
            {item.qty}
          </span>
          {/* reduce button */}
          <button
            className="btn btn-outline-danger btn-item"
            title="Reduce"
            onClick={() => dispatch(reduceOneCart(item._id))}
          >
            -
          </button>
          <button
            onClick={() => dispatch(removeItemCart(item._id))}
            title="Del Item"
            className="btn btn-outline-danger mx-5"
          >
            <BsEraser />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
