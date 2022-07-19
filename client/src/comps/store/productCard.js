import React from "react";
import "./css/productCard.css";

function ProductCard(props) {
  let item = props.item;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 p-2">
      <div className="product-card bg-white mb-4 overflow-hidden d-lg-flex flex-column rounded-lg position-relative">
        <div className="product-image overflow-hidden">
          <img
            src={item.imgUrl || "/images/no_image.png"}
            alt={item.name}
            className="product-thumbnail rounded-lg"
          />
        </div>
        <div className="p-4 product-details">
          <h4 className="font-weight-bold d-flex justify-content-between text-dark text-truncate--2">
            {item.name}
          </h4>
          <h2 className="mr-2">₪ {item.price}</h2>
          <button className="btn btn-outline-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
