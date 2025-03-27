import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";  
import zutatenRoutes from "./routes/zutaten.js";  
import recipeRoutes from "./routes/recipeRoutes.js"; 
import salaryRoutes from "./routes/salaryRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import companyFutterplatzRoutes from "./routes/companyFutterplatzRoutes.js";
import userRoutes from "./routes/user.js";
import cartRoutes from "./routes/cartRoutes.js";  // Bereits bestehende Cart-Route
import orderRoutes from "./routes/orderRoutes.js";  // Bestell-Route hinzufügen

dotenv.config();
connectDB();

// CORS-Optionen für den Frontend-Zugang
var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser()); // Cookies auslesen

// Registrieren der Routen
app.use("/api/auth", authRoutes); 
app.use("/api/zutaten", zutatenRoutes); 
app.use("/api/rezepte", recipeRoutes); 
app.use("/api/salaries", salaryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/companies", companyFutterplatzRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);  // Cart-Route
app.use("/api/orders", orderRoutes);  // Bestell-Route hinzufügen

app.listen(process.env.PORT, () => console.log(`Server läuft auf Port ${process.env.PORT} 🚀`));
