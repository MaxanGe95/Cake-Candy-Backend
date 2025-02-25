import express from "express";
import { registerUser } from "../controllers/registerUser.js";  // Achte auf die Dateiendung .js

const router = express.Router();

router.post("/register", registerUser);

export default router;  
