import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  if (req.method == "PUT") {
    const getAllData = await updatedproduct.find({});
    for (let items of getAllData) {
      let newWarehouse = [];
      for (let wname of items.stock[0].warehouse) {
        if (wname.name != req.body.name) {
          newWarehouse.push(wname);
        } else {
          let newWareHouseName = wname;
          newWareHouseName.name = req.body.newName;
          newWarehouse.push(newWareHouseName);
        }
      }
      items.stock[0].warehouse = newWarehouse;
      await updatedproduct.findByIdAndUpdate({ _id: items._id }, items);
    }
    return res.status(200).json({ msg: "Warehouse name updated" });
  }
};
export default connectDb(handler);
