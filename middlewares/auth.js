import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token; // Token aus dem Cookie holen
  if (!token) {
    return res.status(401).json({ message: "Nicht autorisiert" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token entschlüsseln
    req.user = decoded; // Benutzerinfos in req.user speichern
    next();
  } catch (error) {
    res.status(403).json({ message: "Ungültiges Token" });
  }
};

export default authMiddleware;
