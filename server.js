import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";  
import zutatenRoutes from "./routes/zutaten.js";  
import recipeRoutes from "./routes/recipeRoutes.js"; 
import salaryRoutes from "./routes/salaryRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes); 
app.use("/api/zutaten", zutatenRoutes); 
app.use("/api/rezepte", recipeRoutes); 
app.use("/api/salaries", salaryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoices", invoiceRoutes);

app.listen(process.env.PORT, () => console.log(`Server läuft auf Port ${process.env.PORT} 🚀`));
