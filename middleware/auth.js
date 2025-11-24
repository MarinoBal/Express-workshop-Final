module.exports = (req, res, next) => {
    // Esto luego será reemplazado por validación JWT
    req.user = { id: 1, role: "admin" };
    next();
};
