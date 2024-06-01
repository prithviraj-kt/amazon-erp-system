import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
const handler = async (req, res) => {
  try {
    const updatedData = await updatedproduct.create(req.body);
    return res.status(200).json(updatedData);
  } catch (error) {
    res.send(error);
  }
};
export default connectDb(handler);
