import express from "express";
import Recipe from "../models/Recipe.js"; // Rezept-Modell, das du in Mongoose definieren solltest

const router = express.Router();

// POST-Anfrage zum Erstellen eines neuen Rezepts
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body); // Rezept mit den empfangenen Daten erstellen
    await recipe.save(); // Rezept speichern
    res.status(201).json(recipe); // Erfolgreich zurücksenden
  } catch (error) {
    console.error("Fehler beim Speichern des Rezepts:", error);
    res.status(400).json({ error: "Fehler beim Speichern des Rezepts" });
  }
});

export default router;
