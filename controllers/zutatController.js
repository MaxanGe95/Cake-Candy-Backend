import { Zutat } from "../models/Zutat.js";
import { updateRecipesWithZutat } from "../helpers/recipeHelper.js";

// 📌 Alle Zutaten abrufen
export const getAllZutaten = async (req, res) => {
  try {
    const zutaten = await Zutat.find();
    res.json(zutaten);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Zutaten" });
  }
};

// 📌 Neue Zutat hinzufügen
export const createZutat = async (req, res) => {
  try {
    const neueZutat = new Zutat(req.body);
    const savedZutat = await neueZutat.save();
    res.status(201).json(savedZutat);
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Speichern der Zutat" });
  }
};

// 📌 Zutat aktualisieren + Rezepte synchronisieren
export const updateZutat = async (req, res) => {
  try {
    const updatedZutat = await Zutat.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedZutat) {
      return res.status(404).json({ message: "Zutat nicht gefunden" });
    }

    // Rezepte aktualisieren, wenn eine Zutat geändert wird
    await updateRecipesWithZutat(updatedZutat.name);

    res.json(updatedZutat);
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Aktualisieren der Zutat" });
  }
};

// 📌 Zutat löschen
export const deleteZutat = async (req, res) => {
  try {
    await Zutat.findByIdAndDelete(req.params.id);
    res.json({ message: "Zutat gelöscht" });
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Löschen der Zutat" });
  }
};
