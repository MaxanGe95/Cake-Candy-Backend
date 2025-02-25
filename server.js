import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";  // Achte darauf, `.js` hinzuzufügen
import authRoutes from "./routes/authRoutes.js";  // Achte darauf, `.js` hinzuzufügen
import zutatenRoutes from "./routes/zutaten.js";  // Achte darauf, `.js` hinzuzufügen


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // JSON-Parser für Requests

app.use("/api/auth", authRoutes); // Authentifizierungsrouten

app.use("/api/zutaten", zutatenRoutes); // Zutatenverwaltung-Routen

app.listen(process.env.PORT, () => console.log(`Server läuft auf Port ${process.env.PORT} 🚀`));
