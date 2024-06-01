import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  if (req.method == "POST") {
    const getAllData = await updatedproduct.find({});
    for (let items of getAllData) {
      items.stock[0].warehouse.push(req.body);
      await updatedproduct.findByIdAndUpdate({ _id: items._id }, items);
    }
    return res.status(200).json({ msg: "Warehouse added" });
  }
};
export default connectDb(handler);
