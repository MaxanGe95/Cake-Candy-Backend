const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // JSON-Parser für Requests

app.use("/api/auth", authRoutes); // Authentifizierungsrouten

app.listen(process.env.PORT, () => console.log(`Server läuft auf Port ${process.env.PORT} 🚀`));
