const mongoose = require("mongoose");

const updatedProductSchema = new mongoose.Schema(
  {
    product: Array,
    variations: Array,
    sales_today: Array,
    sales_week: Array,
    sales_month: Array,
    stock: Array,
    pid: String,
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("updatedproduct", updatedProductSchema);