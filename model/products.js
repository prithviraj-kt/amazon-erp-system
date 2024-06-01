const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    uid: String,
    pid: String,
    size: String,
    color: String,
    sku: String,
    cid:String,
    asin: String,
    price: String,
    amzfee: String,
    cost: String,
    profit: String,
    margin: String,
    roi: String,
    pastweek: String,
    previousweek: String,
    sales: String,
    ads: String,
    amzfees: String,
    cost: String,
    promo: String,
    giftwrap: String,
    shopping: String,
    refund: String,
    sellable: String,
    vat: String,
    payout: String,
    profit: String,
    margin: String,
    inventoryfba: String,
    unavailable: String,
    stored: String,
    home: String,
    warehouse: String,
    totaldays: String,
    inorder1: String,
    inorder2: String,
    totalInorder: String,
    color: String,
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);
