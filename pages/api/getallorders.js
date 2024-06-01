import order from "../../model/order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method=="GET"){
        let orders = await order.find()
        return res.status(200).json(orders)
    }
}
export default connectDb(handler);