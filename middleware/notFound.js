module.exports = (req, res, next) => {
    res.status(404).json({ message: "ruta no encontrada o algo esta mal" });
};
