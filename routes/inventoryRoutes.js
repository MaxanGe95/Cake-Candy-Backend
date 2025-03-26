import express from "express";
import Inventory from "../models/Inventory.js"; 
import { updateRecipesWithZutat } from "../helpers/recipeHelper.js"; 

const router = express.Router();

// POST-Route zum Speichern von Inventardaten und Aktualisieren der Rezepte
router.post("/", async (req, res) => {
  try {
    const inventoryData = req.body;
    const updatedItems = new Set(); // Set zur Vermeidung doppelter Aufrufe

    for (const item of inventoryData) {
      const updatedInventory = await Inventory.findOneAndUpdate(
        { itemName: item.itemName }, // Suchkriterium (Artikelname)
        { $set: { quantity: item.quantity } }, // Menge direkt ersetzen
        { upsert: true, new: true } // Falls nicht vorhanden, neu erstellen
      );

      if (updatedInventory) {
        updatedItems.add(item.itemName); // Einmalige Speicherung des itemName
      }
    }

    // Für alle aktualisierten Inventory-Einträge Rezepte updaten
    for (const itemName of updatedItems) {
      await updateRecipesWithZutat(itemName);
    }

    res.status(200).json({ message: "Inventardaten erfolgreich gespeichert oder aktualisiert" });
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
