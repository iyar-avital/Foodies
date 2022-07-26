import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/productCard.css";

function StoreCard(props) {
  let item = props.item;
  let nav = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 p-2">
      <div
        onClick={() => {
          nav("/store/" + item._id);
        }}
        className="product-card bg-white mb-4 overflow-hidden d-lg-flex flex-column rounded-lg position-relative border store"
      >
        <div className="product-image overflow-hidden">
          <img
            src={item.imgUrl || "/images/no_image.png"}
            alt={item.name}
            className="product-thumbnail rounded-lg"
          />
        </div>
        <div className="p-4 product-details">
          {item.name}
          <h4 className="font-weight-bold d-flex justify-content-between">
            <a href="#!" className="text-dark text-truncate--2">
              {item.info}
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
