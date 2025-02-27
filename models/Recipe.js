import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  typ: { type: String, required: true },
  tools: [String],
  unitPrice: { type: Number, required: true },
  b2bPreis: { type: Number, default: 0 },
  b2cPreis: { type: Number, default: 0 },
  istlagerbestand: { type: Number, default: 0 },
  solllagerbestand: { type: Number, default: 0 },
  zusatz: { type: String, default: "" },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      ekPreis: { type: Number, required: true },
    },
  ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;