import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  try {
    console.log(req.body);
    if (req.method == "PUT") {
      const productData = await updatedproduct.findById({ _id: req.body.id });
      if (!productData) {
        return res.status(400).json({ data: "Item does not exist" });
      }
      productData.product[0].cost = req.body.cost;
      const ud = productData;
      const updatedData = await updatedproduct.findByIdAndUpdate(
        { _id: req.body.id },
        ud
      );
      return res.status(200).json({ msg: "Data Updated successfully" });
    }
  } catch (error) {
    res.json({ msg: "error" });
  }
};
export default connectDb(handler);