import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["kunde", "mitarbeiter", "admin"], default: "kunde" }
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);
