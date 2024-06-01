import connectDb from "../../../middleware/mongoose";
import updatedproduct from "../../../model/updatedProduct";
import order from "../../../model/order";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const { item } = req.query;
    try {
      const findItem = await updatedproduct.find({ _id: item });
      if (findItem.length < 1) {
        return res.status(404).json({ msg: "Item does not exist" });
      }
      return res.status(200).json({ msg: findItem });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
    // const getOrder = await order.find({ order_id: req.body.order_id });
    // if (!getOrder) {
    //   const newOrder = await order.create(req.body);
    //   return res.status(200).json({ msg: "Order added successfully" });
    // }
    // else {
    //   await order.findByIdAndUpdate({ order_id: req.body.order_id }, req.body);
    //   return res.status(200).json({ msg: "Order updated successfully" });
    // }
    // const getAllData = await updatedproduct.find({});
    // for (let items of getAllData) {
    //   items.stock[0].warehouse.push(req.body);
    //   await updatedproduct.findByIdAndUpdate({ _id: items._id }, items);
    // }
    // return res.status(200).json({ msg: "Warehouse added" });
  }
};
export default connectDb(handler);
