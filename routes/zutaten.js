import express from "express";
import { Zutat } from "../models/Zutat.js";

const router = express.Router();

// 📌 Alle Zutaten abrufen
router.get("/", async (req, res) => {
  try {
    const zutaten = await Zutat.find();
    res.json(zutaten);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Zutaten" });
  }
});

// 📌 Neue Zutat hinzufügen
router.post("/", async (req, res) => {
  try {
    const neueZutat = new Zutat(req.body);
    const savedZutat = await neueZutat.save();
    res.status(201).json(savedZutat); // MongoDB gibt automatisch die _id zurück
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Speichern der Zutat" });
  }
});


// 📌 Zutat aktualisieren
router.put("/:id", async (req, res) => {
  try {
    // Zutat anhand der ID suchen
    const updatedZutat = await Zutat.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Falls die Zutat nicht existiert, 404 zurückgeben
    if (!updatedZutat) {
      return res.status(404).json({ message: "Zutat nicht gefunden" });
    }

    res.json(updatedZutat);
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Aktualisieren der Zutat" });
  }
});

// 📌 Zutat löschen
router.delete("/:id", async (req, res) => {
  try {
    await Zutat.findByIdAndDelete(req.params.id);
    res.json({ message: "Zutat gelöscht" });
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Löschen der Zutat" });
  }
});

export default router;
