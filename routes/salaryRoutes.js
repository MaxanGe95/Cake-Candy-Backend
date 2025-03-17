import express from "express";
import Salary from "../models/Salary.js";

const router = express.Router();

// POST-Route zum Speichern oder Aktualisieren von Gehältern
router.post("/", async (req, res) => {
  try {
    const salaryData = req.body;

    for (const salary of salaryData) {
      await Salary.findOneAndUpdate(
        { date: salary.date, employeeName: salary.employeeName, accountNumber: salary.accountNumber }, // Eindeutige Kriterien
        { $set: { workingHours: salary.workingHours, salary: salary.salary } }, // Daten aktualisieren
        { upsert: true, new: true } // Falls nicht vorhanden, neu erstellen
      );
    }

    res.status(200).json({ message: "Gehälter erfolgreich gespeichert oder aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Speichern der Gehälter:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Gehälter", error });
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
