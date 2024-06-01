import connectDb from "../../../middleware/mongoose";
import updatedproduct from "../../../model/updatedProduct";
import order from "../../../model/order";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const { ware } = req.query;
    try {
      const findItem = await updatedproduct.find({ _id: ware });
      if (findItem.length < 1) {
        return res.status(404).json({ msg: "Item does not exist" });
      }
      return res.status(200).json({ msg: findItem[0].stock[0].warehouse });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  }
};
export default connectDb(handler);
