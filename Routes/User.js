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

// LOGIN
router.post("/login", (req, res) => {
  console.log("si entro al login  ");

  const { user_mail, user_password } = req.body; // ← FALTABA ESTO

  if (!user_mail || !user_password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const query = "SELECT * FROM user WHERE user_mail = ? AND user_password = ?";
  
  db.query(query, [user_mail, user_password], (err, rows) => {
    if (err) return res.status(500).json({ code: 500, message: err });

    if (rows.length === 1) {
      const token = jwt.sign(
        {
          id: rows[0].user_id,
          mail: rows[0].user_mail,
          admin: rows[0].esadmin
        },
        JWT_KEY
      );

      return res.status(200).json({ code: 200, token });
    }

    return res.status(401).json({ code: 401, message: "Credenciales incorrectas" });
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
