import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  typ: { type: String, required: true },
  tools: [String],
  unitPrice: { type: Number, required: true },
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