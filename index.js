//dependencias
const express = require('express');
const morgan = require('morgan');
const app = express();
// middlewares
const cors = require('./middleware/cors');
const notFound = require('./middleware/notFound');

//rutas 
const userRuta = require('./Routes/User');
const EmpleadoRuta = require('./Routes/empleados');

//otros middlewares
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//carga el indice.html de la carpeta public
app.use(express.static("public")); 

//ruta de usuario
app.use("/user", userRuta);

//ruta de empleados
app.use("/empleados", EmpleadoRuta);

//404
app.use(notFound);

//bd y server
require("./config/database");

//si funciona el server
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});