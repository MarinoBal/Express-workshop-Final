module.exports = (req, res, next) => {
  if (req.user.esadmin === 1) {
    return next();
  }
  return res.status(403).json({ message: "Acceso denegado, no eres administrador" });
};