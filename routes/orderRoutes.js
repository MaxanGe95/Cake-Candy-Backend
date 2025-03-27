// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Bestellung anlegen
router.post("/buy", async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;
    if (!user || !products || !totalPrice) {
      return res.status(400).json({ message: "Fehlende Daten" });
    }

    const order = new Order({ user, products, totalPrice });
    await order.save();
    res.status(201).json({ message: "Bestellung erfolgreich", order });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen der Bestellung", error });
  }
});

// Alle Bestellungen abrufen
router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();  // Alle Bestellungen aus der Datenbank holen
      res.status(200).json(orders);  // Bestellungen zurückgeben
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen der Bestellungen", error });
    }
  });
  

export default router;
