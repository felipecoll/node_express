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

//Ruta para procesar datos del formulario

app.post('/form', (req, res) => {
    const { name, email } = req.body;
    res.send(`
        <h2>Datos recibidos:</h2>
        <p>Nombre: ${name}</p>
        <p>Email: ${email}</p>
    `);

    res.json({
        message: 'Datos recibidos correctamente',
        data: {
            name: name,
            email: email
        }
    });
});

app.post('/api/data', (req, res) => {
    const data = req.body;

    if(!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se recibieron datos' });
    }
    res.status(201).json({
        message: 'Datos recibidos correctamente',
        data: data
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
