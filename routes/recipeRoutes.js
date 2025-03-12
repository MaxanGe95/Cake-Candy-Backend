import express from "express";
import Recipe from "../models/Recipe.js";
import { Zutat } from "../models/Zutat.js"; // Import des Zutat-Modells
import { convertRecipeToIngredient } from "../helpers/converter.js"; // Import der Konvertierungsfunktion
import multer from "multer"; // damit kann ich Dateien hochladen
import { v4 as uuidv4 } from "uuid"; // generiert uuids z.b. 719922f5-23d3-40d2-a29d-ab30e815f1a2
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from "sharp";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer-Speicher im Speicher
// Bild soll vorher komprimiert werden
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/:id/image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Kein Bild hochgeladen");
    }

    // Überprüfen, ob das Bild im richtigen Format vorliegt
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Rezept nicht gefunden");
    }

    // Erzeuge einen Dateinamen
    const filename = `recipe_${req.params.id}_${Date.now()}.webp`; // Für WebP-Komprimierung
    const outputPath = path.resolve(__dirname, "../uploads", filename);

    // Bild mit Sharp komprimieren
    const imageBuffer = req.file.buffer;

    // Überprüfe das Format der hochgeladenen Datei
    const image = sharp(imageBuffer);
    const metadata = await image.metadata(); // Ruft die Metadaten des Bildes ab (z. B. Format)

    // Komprimieren und speichern
    await image
      .resize(800) // Bildgröße anpassen
      .webp({ quality: 90 }) // WebP-Format mit guter Komprimierung
      .toFile(outputPath);

    // Dateinamen in der DB speichern
    // Das Bild wird nicht in der Datenbank gespeichert
    recipe.productImage = filename;
    await recipe.save();

    res.send("Bild erfolgreich hochgeladen und komprimiert");
  } catch (error) {
    console.error(error);
    res.status(500).send("Fehler beim Bildhochladen");
  }
});

// GET-Route für das Abrufen des Bildes eines Rezepts anhand der ID
router.get('/:id/image', async (req, res) => {
  try {
    // Suche das Rezept in der Datenbank anhand der ID
    const recipe = await Recipe.findById(req.params.id);
    
    // Überprüfe, ob das Rezept oder das zugehörige Bild nicht gefunden wurde
    if (!recipe || !recipe.productImage) {
      // Wenn kein Rezept oder kein Bild vorhanden ist, sende eine 404-Fehlermeldung
      return res.status(404).send('Bild nicht gefunden');
    }

    // Berechne den absoluten Pfad zur Bilddatei auf dem Server
    const absolutePath = path.resolve(__dirname, '../uploads', recipe.productImage);

    // Sende die Bilddatei als Antwort an den Client
    res.sendFile(absolutePath, (err) => {
      // Falls beim Senden der Datei ein Fehler auftritt
      if (err) {
        // Beende die Antwort mit dem Fehlerstatus
        res.status(err.status).end();
      }
    });
  } catch (error) {
    // Falls ein Fehler während des Prozesses auftritt, sende einen 500-Fehler (Serverfehler)
    res.status(500).send('Serverfehler');
  }
});

export default router;
