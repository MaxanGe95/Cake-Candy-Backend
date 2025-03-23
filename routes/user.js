import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST-Route zum Speichern oder Aktualisieren von Benutzerdaten
router.post("/", async (req, res) => {
  try {
    const userData = req.body;

    for (const user of userData) {
      await User.findOneAndUpdate(
        { email: user.email }, // Eindeutige Kriterien
        { $set: { name: user.name, role: user.role } }, // Daten aktualisieren
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Benutzerdaten erfolgreich gespeichert oder aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Speichern der Benutzerdaten:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Benutzerdaten", error });
  }
});



// PUT-Route zum Aktualisieren von Benutzerdaten
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, role, email } = req.body;

  try {
    // Benutzerdaten nach der ID suchen und aktualisieren
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, role, email } }, // Nur name und role aktualisieren
      { new: true } // Gebe den aktualisierten Benutzer zurück
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Benutzerdaten:", error);
    res.status(500).json({ message: "Fehler beim Aktualisieren der Benutzerdaten", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User nicht gefunden" });

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Users:", error);
    res.status(400).json({ message: "Fehler beim Löschen des Users" });
  }
});

// GET-Route für das Abrufen von Benutzern
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Benutzer", error });
  }
});

export default router;
