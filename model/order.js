const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  { order_id: Number, date: String, supplier: String },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("order", orderSchema);