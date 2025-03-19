import User from "../models/User.js";  // Achte auf die .js Endung
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Prüfen, ob User mit der E-Mail bereits existiert
    let userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
      return res.status(400).json({ message: "E-Mail bereits registriert" });
    }

    // Prüfen, ob User mit dem Benutzernamen bereits existiert
    let userExistsByUsername = await User.findOne({ username });
    if (userExistsByUsername) {
      return res.status(400).json({ message: "Benutzername bereits vergeben" });
    }

    // Passwort hashen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Neuen User speichern
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // JWT-Token erstellen
    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // Token als HttpOnly-Cookie setzen
    res.cookie("token", token, {
      httpOnly: true,  // Schutz vor XSS
      secure: process.env.NODE_ENV === "production", // Nur HTTPS in Produktion
      sameSite: "strict", // Schutz vor CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage gültig
    });

    // Erfolgreiche Antwort zurück an den Client
    res.status(201).json({
      message: "Registrierung erfolgreich",
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler", error });
  }
};
