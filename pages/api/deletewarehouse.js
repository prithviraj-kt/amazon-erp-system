import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  if (req.method == "DELETE") {
    const getAllData = await updatedproduct.find({});
    let condition = true;
    for (let items of getAllData) {
      for (let wname of items.stock[0].warehouse) {
        if (wname.name == req.body.name && wname.value != 0) {
          condition = false;
        }
      }
    }
    if (condition == false) {
      return res.status(200).json({ msg: "Warehouse cannot be deleted" });
    } else {
      for (let item of getAllData) {
        let newWarehouse = [];
        for (let wname of item.stock[0].warehouse) {
          if (wname.name != req.body.name) {
            newWarehouse.push(wname);
          }
        }
        item.stock[0].warehouse = newWarehouse;
        await updatedproduct.findByIdAndUpdate({ _id: item._id }, item);
      }
      return res.status(200).json({ msg: "Warehouse deleted" });
    }
  }
};
export default connectDb(handler);
