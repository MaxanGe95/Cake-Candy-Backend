import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// POST-Route für das Speichern von Rechnungen
router.post("/", async (req, res) => {  
  const { company, customerType, products, totalAmount, date } = req.body;

  try {
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { company, date }, // Eindeutiges Suchkriterium (z. B. Firma und Datum)
      { $set: { customerType, products, totalAmount } }, // Daten aktualisieren
      { new: true, upsert: true } // Falls nicht vorhanden, neu anlegen
    );

    res.status(200).json({ message: "Rechnung gespeichert oder aktualisiert", updatedInvoice });
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
