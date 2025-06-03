const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenido a la API</h1>
    <p>Utiliza las rutas /api/users para gestionar usuarios.</p>
    <p>Utiliza las rutas /api/form para enviar datos de formulario.</p>
    <p>Utiliza las rutas /api/data para enviar datos JSON.</p>
    <p>Utiliza las rutas /api/hello para recibir un saludo.</p>
    <p>Utiliza las rutas /api/greet para saludar a un usuario por su nombre.</p>
    <p>Utiliza las rutas /api/hello-world para recibir un saludo en inglés.</p>