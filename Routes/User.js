const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/database");

const JWT_KEY = "debugkey";

// Perfil del usuario
router.get("/profile", require("../middleware/auth"), (req, res) => {
  const userId = req.user.id;

  const query = "SELECT user_id, user_name, user_mail FROM user WHERE user_id = ?";
  db.query(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error DB", err });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Perfil del usuario",
      usuario: rows[0]
    });
  });
});


// Actualizar usuario
router.put("/update", require("../middleware/auth"), (req, res) => {
  const userId = req.user.id;
  const { user_name, user_mail } = req.body;

  if (!user_name || !user_mail) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const query = `
    UPDATE user 
    SET user_name = ?, user_mail = ?
    WHERE user_id = ?
  `;

  db.query(query, [user_name, user_mail, userId], (err) => {
    if (err) return res.status(500).json({ message: "Error DB", err });

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  });
});

// Eliminar usuario
router.delete("/delete", require("../middleware/auth"), (req, res) => {
  const userId = req.user.id;

  const query = "DELETE FROM user WHERE user_id = ?";

  db.query(query, [userId], (err) => {
    if (err) return res.status(500).json({ message: "Error DB", err });

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  });
});


module.exports = router;
