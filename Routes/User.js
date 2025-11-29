const express = require("express");
const jwt = require("jsonwebtoken");  
const router = express.Router();
const db = require("../config/database");



const JWT_KEY = "debugkey";


// Perfil del usuario
router.get("/profile", require("../middleware/auth"), (req, res, next) => {
  const userId = req.user.id;

  const query = "SELECT user_id, user_name, user_mail FROM user WHERE user_id = ?";
  db.query(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "error en la bd", err });

    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontro el usuario o ni existe " });
    }

    res.status(200).json({
      message: "Perfil del usuario: ",
      usuario: rows[0]
    });
  });
});

// login
router.post("/login", (req, res) => {
    const { user_mail, user_password } = req.body;

    const query = "SELECT * FROM user WHERE user_mail = ?";

    db.query(query, [user_mail], async (err, rows) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        // No existe el correo
        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Validar contraseña
        if (user.user_password !== user_password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // VALIDAR SI ES ADMIN
        if (user.esadmin !== 1) {
            return res.status(403).json({
                message: "Acceso denegado. No eres administrador"
            });
        }

        // Generar token SOLO si es admin
        const token = jwt.sign(
            {
                id: user.id,
                user_mail: user.user_mail,
                esadmin: user.esadmin
            },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
        );

        res.status(200).json({
            code: 200,
            token
        });
    });
});



// Actualizar usuario
router.put("/update", require("../middleware/auth"), (req, res, next) => {
  const userId = req.user.id;
  const { user_name, user_mail } = req.body;

  if (!user_name || !user_mail) {
    return res.status(400).json({ message: "Falta el nombre o correo" });
  }

  const query = `
    UPDATE user 
    SET user_name = ?, user_mail = ?
    WHERE user_id = ?
  `;

  db.query(query, [user_name, user_mail, userId], (err) => {
    if (err) return res.status(500).json({ message: "error en la bd", err });

    res.status(200).json({ message: "Se actualizo el usuario" });
  });
});

// Eliminar usuario
router.delete("/delete", require("../middleware/auth"), (req, res, next) => {
  const userId = req.user.id;

  const query = "DELETE FROM user WHERE user_id = ?";

  db.query(query, [userId], (err) => {
    if (err) return res.status(500).json({ message: "error en la bd", err });

    res.status(200).json({ message: "Se elimino el usuario " });
  });
});


module.exports = router;
