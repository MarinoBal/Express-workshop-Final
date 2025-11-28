const jwt = require("jsonwebtoken");
const JWT_KEY = "debugkey";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ message: "Falta token" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
