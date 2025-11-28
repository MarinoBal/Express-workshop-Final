const jwt = require("jsonwebtoken");
const JWT_KEY = "debugkey";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const tokenCorrecto = token.split(" ")[1]; 

  jwt.verify(tokenCorrecto, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = {
      id: decoded.user_id,
      email: decoded.user_mail
    };

    next();
  });
};
