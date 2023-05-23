import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_URI ? process.env.DB_URI : "");
const schema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    fromUserID: { type: Schema.Types.ObjectId, ref: "users" },
    toUserID: { type: Schema.Types.ObjectId, ref: "users" },
    fromUserUsername: { type: String },
    fromUserFirstName: { type: String },
    fromUserAvatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.messages || mongoose.model("messages", schema);
