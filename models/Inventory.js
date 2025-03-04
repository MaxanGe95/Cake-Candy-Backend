import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
