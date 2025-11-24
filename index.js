//dependencias
const express = require('express');
const morgan = require('morgan');
const app = express();

// rutas
const authRuta = require('./Routes/Auth');
const EmpleadoRuta = require('./Routes/Empleados');

// middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// principal
app.get("/", index);

// rutas publica
app.use("/auth", authRuta);

// middleware de autenticacion
app.use(auth);

//ruta privada paara empleados
app.use("/empleados", EmpleadoRuta);

// 404
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
