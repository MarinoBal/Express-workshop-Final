// dependencias
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const esadmin = require('./middleware/esadmin');

//para carpeta public
app.use(express.static("public"));

// Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// lobby
app.get("/", index);

// RUTAS PUBLICAS 
const authRuta = require('./Routes/authRoutes');
const userRuta = require('./Routes/User');
const EmpleadoRuta = require('./Routes/empleados');
  
app.use("/auth", authRuta);
app.use("/user", userRuta);

// RUTAS PRIVADAS
app.use(auth); 
app.use("/empleados", esadmin, EmpleadoRuta);

// 404
app.use(notFound);

// conectar database
require("./config/database");

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
