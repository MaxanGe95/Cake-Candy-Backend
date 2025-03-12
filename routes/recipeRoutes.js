import express from "express";
import Recipe from "../models/Recipe.js";
import { Zutat } from "../models/Zutat.js"; // Import des Zutat-Modells
import { convertRecipeToIngredient } from "../helpers/converter.js"; // Import der Konvertierungsfunktion

const router = express.Router();

// 📌 Rezept erstellen + automatische Umwandlung in eine Zutat
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    // Automatische Konvertierung in eine Zutat
    const zutatData = convertRecipeToIngredient(recipe);
    const zutat = new Zutat(zutatData);
    await zutat.save();

    res.status(201).json({ message: "Rezept erstellt und in Zutat umgewandelt", recipe, zutat });
  } catch (error) {
    console.error("Fehler beim Speichern des Rezepts:", error);
    res.status(400).json({ error: "Fehler beim Speichern des Rezepts" });
  }
});

// 📌 Alle Rezepte abrufen
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
    res.status(400).json({ error: "Fehler beim Abrufen der Rezepte" });
  }
});

// 📌 Rezept aktualisieren + Zutat aktualisieren
router.put("/:id", async (req, res) => {
  try {
    // Rezept aktualisieren
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Rezept nicht gefunden" });

    // Zutat basierend auf dem Rezept finden und aktualisieren
    const zutatData = convertRecipeToIngredient(updatedRecipe);
    const updatedZutat = await Zutat.findOneAndUpdate({ name: updatedRecipe.name }, zutatData, { new: true });
    
    if (!updatedZutat) {
      // Falls keine Zutat existiert, eine neue Zutat erstellen
      const newZutat = new Zutat(zutatData);
      await newZutat.save();
    }

    res.json({ message: "Rezept und Zutat aktualisiert", updatedRecipe, updatedZutat });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Rezepts:", error);
    res.status(400).json({ message: "Fehler beim Aktualisieren des Rezepts" });
  }
});

// 📌 Rezept löschen
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Rezept nicht gefunden" });

    await Recipe.findByIdAndDelete(req.params.id);

    // Zutat löschen, die mit dem Rezept verbunden ist
    await Zutat.findOneAndDelete({ name: recipe.name });

    res.json({ message: "Rezept und Zutat gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Rezepts:", error);
    res.status(400).json({ message: "Fehler beim Löschen des Rezepts" });
  }
});

export default router;
