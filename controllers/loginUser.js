import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Prüfen, ob der Benutzer existiert
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }

    // Passwort überprüfen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }

    // JWT-Token erstellen
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Token als HttpOnly-Cookie setzen
    res.cookie("token", token, {
      httpOnly: true, // Schutz vor XSS
      secure: process.env.NODE_ENV === "production", // Nur HTTPS in Produktion
      sameSite: "strict", // Schutz vor CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage gültig
    });

    res.status(200).json({
      message: "Login erfolgreich",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        employeeName: user.employeeName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler", error });
  }
};
