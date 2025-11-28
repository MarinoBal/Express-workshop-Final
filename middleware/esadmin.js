const db = require("../config/database");

module.exports = (req, res, next) => {
    const userId = req.user.id;

    const query = "SELECT esadmin FROM user WHERE user_id = ?";

    db.query(query, [userId], (err, rows) => {

        if (!rows.length || rows[0].esadmin !== 1) {
            return res.status(403).json({ message: "No tienes permisos de administrador" });
        }

        next();
    });
};
