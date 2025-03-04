import express from "express";
import Salary from "../models/Salary.js";

const router = express.Router();

// POST-Route zum Speichern oder Aktualisieren von Gehältern
router.post("/", async (req, res) => {
  try {
    const salaries = await Salary.insertMany(req.body);
    res.status(201).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern", error });
  }
});

// GET-Route für das Abrufen von Gehältern
router.get("/", async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Gehälter", error });
  }
});

export default router;
