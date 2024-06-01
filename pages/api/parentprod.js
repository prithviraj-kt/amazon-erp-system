import updatedproduct from "../../model/updatedProduct";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let products = await updatedproduct.find();
    let parentProd = {};

    for (let item of products) {
      if (item.pid == "null") {
        parentProd[item._id] = JSON.parse(JSON.stringify(item));
      } else if (item.pid == "parent") {
        parentProd[item._id] = JSON.parse(JSON.stringify(item));
      } else {
        if (!parentProd[item.pid].id) {
          parentProd[item.pid].id = [item];
        } else {
          parentProd[item.pid].id.push(item);
        }
      }
    }
    return res.status(200).json({ data: parentProd });
  }
};
export default connectDb(handler);
