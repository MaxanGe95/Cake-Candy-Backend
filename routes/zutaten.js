import express from "express";
import {
  getAllZutaten,
  createZutat,
  updateZutat,
  deleteZutat,
} from "../controllers/zutatController.js";

const router = express.Router();

// 📌 Alle Zutaten abrufen
router.get("/", getAllZutaten);

// 📌 Neue Zutat hinzufügen
router.post("/", createZutat);

// 📌 Zutat aktualisieren + verknüpfte Rezepte aktualisieren
router.put("/:id", updateZutat);

// 📌 Zutat löschen
router.delete("/:id", deleteZutat);

export default router;
