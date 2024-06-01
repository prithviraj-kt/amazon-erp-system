import connectDb from "../../../../middleware/mongoose";
import updatedproduct from "../../../../model/updatedProduct";
import order from "../../../../model/order";
const idAutoIncrement = require("id-auto-increment");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const newOrders = req.body;
      const orders = 0;
      const getAllData = await updatedproduct.find({});
      const getAllOrders = await order.find({});
      const order_id = getAllOrders.length;

      const newOrder = {};
      newOrder["order_id"] = order_id;
      newOrder["date"] = newOrders.date;
      newOrder["supplier"] = newOrders.supplier;
      const latestOrder = await order.create(newOrder);
      for (let items of getAllData) {
        for (const [key, value] of Object.entries(newOrders)) {
          if (items._id == key) {
            value["order_id"] = order_id;
            items.stock[0].order.push(value);
            await updatedproduct.findByIdAndUpdate({ _id: items._id }, items);
          }
        }
      }

      return res.status(200).send({ msg: "Order created successfully" });
    } catch (error) {
      return res.status(400).send({ msg: "Order failed" });
    }

    // const { itemid } = req.query;
    // try {
    //   const findItem = await updatedproduct.find({ _id: itemid });
    //   if (findItem.length < 1) {
    //     return res.status(404).json({ msg: "Item does not exist" });
    //   }
    //   const orderId = await order.countDocuments();
    //   const orderData = await req.body;
    //   orderData["order_id"] = orderId;
    //   await order.create(orderData);
    //   const newOrder = {};
    //   newOrder["order_id"] = orderData.order_id;
    //   newOrder["qty"] = orderData.qty;
    //   newOrder["days"] = orderData.days;
    //   await findItem[0].stock[0].order.push(newOrder);
    //   await updatedproduct.findByIdAndUpdate({ _id: itemid }, findItem[0]);
    //   return res.status(200).json({ msg: "Order Added" });
    // } catch (error) {
    //   return res.status(400).json({ msg: error });
    // }
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
