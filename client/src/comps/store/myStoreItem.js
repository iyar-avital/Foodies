import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsFillInfoCircleFill, BsColumns } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MyStoreItem(props) {
  let nav = useNavigate();
  let item = props.item;
  let statusColor = {
    color: "white",
    background: "#F1948A",
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="col-md-4 col-sm-6 mb-4"
    >
      <div
        className="payment-card rounded-lg shadow bg-white text-center h-100 cursor-pointer"
        onClick={() => nav("/storeAdmin/" + item._id)}
      >
        <div className="payment-card__type px-4 py-5 d-flex justify-content-center align-items-center">
          <div
            style={item.status == "pending" ? statusColor : {}}
            className="status_tag text-uppercase text-center"
          >
            {item.status}
          </div>
          <img src={item.imgUrl || "/images/no_image.png"} alt={item.name + " image"} />
        </div>
        <div className="payment-card__info p-4">
          <h4>{item.name}</h4>
          {/* <p className="text-muted">address : {item.address}</p> */}
          <hr />
        </div>
      </div>
    </motion.div>
  );
}

export default MyStoreItem;
