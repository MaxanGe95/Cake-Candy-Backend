import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    company: String,
    customerType: String, // B2B oder B2C
    products: [
      {
        productName: String,
        pricePerUnit: Number,
        quantity: Number,
        totalPrice: Number,
      },
    ],
    totalAmount: Number, // Gesamtrechnungsbetrag
    date: { type: Date, default: Date.now },
  });

  const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;