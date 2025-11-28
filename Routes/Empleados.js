const express = require("express");
const router = express.Router();
const db = require("../config/database");
const auth = require("../middleware/auth");
const esadmin = require("../middleware/esadmin");


// listar empleados
router.get("/",  auth, esadmin, (req, res, next) => {
    const query = "SELECT * FROM empleados";

    db.query(query, (err, rows) => {
        if (err) return res.status(500).json({ message: "error en la bd", err });

        res.status(200).json({
            message: "Lista de empleados",
            empleados: rows
        });
    });
});

//buscar empleados por nombre
router.get("/buscar", auth, esadmin, (req, res, next) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ message: "Ingresa un nombre primero" });
    }

    const query = "SELECT * FROM empleados WHERE nombre LIKE ?";
    db.query(query, [`%${nombre}%`], (err, rows) => {
        if (err) return res.status(500).json({ message: "error en la bd", err });

        res.status(200).json({
            message: "Resultados: ",
            empleados: rows
        });
    });
});

// agregar empleado
router.post("/", auth, esadmin, (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if (!nombre || !apellidos) {
        return res.status(400).json({ message: "Falta nombre o apellidos" });
    }

    const query = `INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nombre, apellidos, telefono, correo, direccion], (err, result) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(201).json({
            message: "Se ingreso el empleado ",
            empleado_id: result.insertId
        });
    });
});

// editar empleado
router.put("/:id", auth, esadmin, (req, res, next) => {
    const { id } = req.params;
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    const query = `
        UPDATE empleados 
        SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ?
        WHERE empleado_id = ?`;

    db.query(query, [nombre, apellidos, telefono, correo, direccion, id], (err) => {
        if (err) return res.status(500).json({ message: "error en la bd", err });

        res.status(200).json({ message: "Se actualizo el empleado" });
    });
});

// eliminar empleado
router.delete("/:id", auth, esadmin, (req, res, next) => {
    const { id } = req.params;

    const query = "DELETE FROM empleados WHERE empleado_id = ?";

    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: "error en la bd", err });

        res.status(200).json({ message: "Se elimino el empleado " });
    });
});

module.exports = router;
