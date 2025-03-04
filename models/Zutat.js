import mongoose from "mongoose";

const ZutatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  typ: { type: String, default: "Rohprodukt" },
  ekPreis: { type: Number, required: true },
  b2bPreis: { type: Number, default: 0 },
  b2cPreis: { type: Number, default: 0 },
  istlagerbestand: { type: Number, default: 0 },
  solllagerbestand: { type: Number, default: 0 },
  zusatz: { type: String, default: "" }
});

export const Zutat = mongoose.model("Zutat", ZutatSchema);