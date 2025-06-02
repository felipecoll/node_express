require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
//Middleware
const bodyParser = require('body-parser');

const fs = require('fs');

//Path o ruta de archivo
const Path = require('path');   
const userFilePath = Path.join(__dirname, 'users.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.json());


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
    const name = req.body.name || "anónimo";
    const email = req.body.email || "no proporcionado";
    
    res.json({
        message: "Datos recibidos",
        data: {
            name,
            email
        }
    });
});


app.post('/data', (req, res) => {
    const data = req.body;
    
    // Validación para asegurar que recibimos datos válidos
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            error: "No se recibieron datos"
        });
    }
    
    res.status(200).json({
        message: "Datos JSON recibidos",
        data
    });
});

// =======================================================

app.get('/users', (req, res) => {
    // Leer el archivo users.json
    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer los usuarios' });
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            res.status(500).json({ error: 'Error al procesar los datos de los usuarios' });
        }
    });
})

app.post('/users', (req, res) => {
    const newUser = req.body;

    // Validación básica
     if (!newUser.name || !newUser.email) {
         return res.status(400).json({ error: 'Nombre y correo electrónico son requeridos' });
     }

    // Leer el archivo users.json
    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer los usuarios' });
        }

        try {
            const users = JSON.parse(data);
            users.push(newUser);

            // Escribir de nuevo en el archivo
            fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al escribir en el archivo:', writeErr);
                    return res.status(500).json({ error: 'Error al guardar el nuevo usuario' });
                }
                res.status(201).json(newUser);
            });
        } catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            res.status(500).json({ error: 'Error al procesar los datos de los usuarios' });
        }
    });
})


//Prueba y control de servidor corriendo
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
