const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products_ar: {
    type: Array,
    required: [true, "can't be blank"],
  },
  client_short_id: String,
  status: {
    type: String,
    default: "pending",
  },
  total_price: Number,
  date_created: {
    type: Date,
    default: Date.now(),
  },
  short_id: String,
  store_short_id: {
    type: "String",
    required: [true, "can't be blank"],
  },
});

exports.OrderModel = mongoose.model("orders", orderSchema);
