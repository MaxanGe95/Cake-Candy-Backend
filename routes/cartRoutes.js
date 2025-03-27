import express from "express";
import authMiddleware from "../middlewares/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/buy", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // User-ID aus Token holen

    const user = await User.findById(userId);

    // TODO Bestand Reduzieren, Rechnung erstellen etc.
    console.log(
      `Nutzer ${user.username} mit ${
        user.id
      } hat folgende Waren gekauft: ${JSON.stringify(req.body)}`
    );

    res.status(200).json({ message: "Erfolgreich gekauft" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Kaufen des Warenkorbs", error });
  }
});

export default router;
