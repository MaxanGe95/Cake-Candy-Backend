import express from "express";
import Company from "../models/CompanyFutterplatz.js";
const router = express.Router();


// Route zum Hinzufügen einer neuen Firma
router.post('/add', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Firma muss einen Namen haben' });
  }

  try {
    const newCompany = new Company({ name });
    await newCompany.save();
    res.status(201).json({ message: 'Firma erfolgreich hinzugefügt', company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Hinzufügen der Firma' });
  }
});


router.get('/', async (req, res) => {
    try {
      const companies = await Company.find(); // Alle Firmen aus der Datenbank holen
      res.status(200).json(companies); // Firmen zurückgeben
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Fehler beim Abrufen der Firmen' });
    }
  });
  

export default router;
