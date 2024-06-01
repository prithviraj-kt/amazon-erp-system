const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

mongoose.models = {};
export default mongoose.model("Registration", registrationSchema);
