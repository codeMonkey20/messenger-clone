import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI ? process.env.DB_URI : "");
const schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  firstName: { type : String },
  lastName: { type : String },
});

export default mongoose.models.users || mongoose.model("users", schema);
