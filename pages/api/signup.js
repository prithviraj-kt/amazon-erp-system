import connectDb from "../../middleware/mongoose";
import Registration from "../../model/Registration"
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  if (req.method == "POST") {
    const{name, email, password} = req.body
    let encPassword = CryptoJS.AES.encrypt(req.body.password, "secret123")
    let u = await new Registration({name, email, password: encPassword.toString()});
    u.save();
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({
      error: "Error",
    });
  }
};

export default connectDb(handler);