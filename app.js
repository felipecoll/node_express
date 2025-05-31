require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
//Middleware
const bodyParser = require('body-parser');

const app = express();
app.use('body-parser', bodyParser.json());
app.use('body-parser', bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;
console.log(PORT)

app.get('/', (req, res) => {
    res.send(`
        <h1>Curso express Js</h1>
        <p>Este es un ejemplo de una aplicación Express.</p>
        <p>Corre en el puerto ${PORT} de momento...</p>
        `);  
});

// Rutas adicionales
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Detalles del usuario con ID: ${userId}`);
});

app.get('/search', (req, res) => {
    const query = req.query.q || 'No query provided';
    res.send(`Resultados de búsqueda para: ${query}`);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
