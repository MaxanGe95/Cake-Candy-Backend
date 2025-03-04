import express from "express";
import Inventory from "../models/Inventory.js"; 

const router = express.Router();

// POST-Route zum Speichern von Inventardaten
router.post("/", async (req, res) => {
  try {
    const inventoryData = req.body;

    for (const item of inventoryData) {
      const newInventoryItem = new Inventory({
        itemName: item.itemName,
        quantity: item.quantity,
      });

      await newInventoryItem.save();
    }

    res.status(200).json({ message: "Inventardaten erfolgreich gespeichert" });
  } catch (error) {
    console.error("Fehler beim Speichern der Inventardaten:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Inventardaten" });
  }
});

// GET-Route zum Abrufen von Inventardaten
router.get("/", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find(); // Alle Inventaritems abfragen
    res.status(200).json(inventoryItems); // Rückgabe der Inventardaten
  } catch (error) {
    console.error("Fehler beim Abrufen der Inventardaten:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Inventardaten" });
  }
});

export default router;
