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
    const terms = req.query.termino || 'No introdujo una búsqueda';
    const category = req.query.categoria || 'Todas';

    res.send(`
            <h2>Resultados de la busqueda:</h2>
            <p>Termino: ${terms}</p>
            <p>Categoría: ${category}</p>
            <p>Esta es una búsqueda de ejemplo.</p>
        `);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
