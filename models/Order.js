// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

export default mongoose.model("Order", OrderSchema);
