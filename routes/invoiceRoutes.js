import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// POST-Route für das Speichern von Rechnungen
router.post("/", async (req, res) => {  
  const { company, customerType, products, totalAmount } = req.body;

  const newInvoice = new Invoice({
    company,
    customerType,
    products,
    totalAmount,
  });

  try {
    await newInvoice.save();
    res.status(201).json({ message: "Rechnung erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern der Rechnung", error });
  }
});

// GET-Route für das Abrufen von Rechnungen
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find(); 
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Rechnungen", error });
  }
});

export default router;
