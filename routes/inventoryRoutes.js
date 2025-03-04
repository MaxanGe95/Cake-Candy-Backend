import express from "express";
import Inventory from "../models/Inventory.js"; 

const router = express.Router();

// Route zum Speichern von Inventardaten
router.post("/", async (req, res) => {
  try {
    const inventoryData = req.body;

    // Alle neuen Daten in der Datenbank speichern
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

export default router;
