import connectDb from "../../middleware/mongoose";
import Registration from "../../model/Registration";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await Registration.findOne({ email: req.body.email });
    const decryptPass = CryptoJS.AES.decrypt(
      user.password,
      "secret123"
    ).toString(CryptoJS.enc.Utf8);

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptPass) {
        return res.status(200).json({ success: true, user });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ success: false, error: "No user found" });
    }
  } else {
    return res.status(400).json({
      error: "Error",
    });
  }
};

export default connectDb(handler);
