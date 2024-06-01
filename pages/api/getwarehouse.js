import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  if (req.method == "GET") {
    const getAllData = await updatedproduct.find({});

    return res.status(200).json({ msg: getAllData });
  }
};
export default connectDb(handler);
