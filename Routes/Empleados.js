const express = require("express");
const router = express.Router();
const db = require("../config/database");

// listar empleados
router.get("/", (req, res) => {
    const query = "SELECT * FROM empleados";

    db.query(query, (err, rows) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(200).json({
            message: "Lista de empleados",
            empleados: rows
        });
    });
});

//buscar empleados por nombre
router.get("/buscar", (req, res) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ message: "Debe proporcionar un nombre" });
    }

    const query = "SELECT * FROM empleados WHERE nombre LIKE ?";
    db.query(query, [`%${nombre}%`], (err, rows) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(200).json({
            message: "Resultados de búsqueda",
            empleados: rows
        });
    });
});

// agregar empleado
router.post("/", (req, res) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if (!nombre || !apellidos) {
        return res.status(400).json({ message: "Nombre y apellidos son obligatorios" });
    }

    const query = `INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nombre, apellidos, telefono, correo, direccion], (err, result) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(201).json({
            message: "Empleado agregado correctamente",
            empleado_id: result.insertId
        });
    });
});

// editar empleado
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    const query = `
        UPDATE empleados 
        SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ?
        WHERE empleado_id = ?`;

    db.query(query, [nombre, apellidos, telefono, correo, direccion, id], (err) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(200).json({ message: "Empleado actualizado correctamente" });
    });
});

// eliminar empleado
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM empleados WHERE empleado_id = ?";

    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: "Error DB", err });

        res.status(200).json({ message: "Empleado eliminado correctamente" });
    });
});

module.exports = router;
