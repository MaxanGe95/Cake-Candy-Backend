import express from "express";
import Recipe from "../models/Recipe.js"; // Stelle sicher, dass das Modell korrekt importiert wird

const router = express.Router();

// ✅ GET-Route: Alle Rezepte abrufen
router.get("/", async (req, res) => {
  try {
    const rezepte = await Recipe.find(); // Holt alle Rezepte aus der DB
    res.status(200).json(rezepte);
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Rezepte" });
  }
});

// ✅ POST-Route: Ein neues Rezept erstellen
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.zutaten) {
      return res.status(400).json({ error: "Name und Zutaten sind erforderlich" });
    }

    const recipe = new Recipe(req.body); // Rezept mit den empfangenen Daten erstellen
    await recipe.save(); // Rezept speichern
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Fehler beim Speichern des Rezepts:", error);
    res.status(500).json({ error: "Fehler beim Speichern des Rezepts" });
  }
});

export default router;
