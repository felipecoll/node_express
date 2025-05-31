const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT)

app.get('/', (req, res) => {
    res.send(`
        <h1>Curso express Js</h1>
        <p>Este es un ejemplo de una aplicación Express.</p>
        <p>Corre en el puerto ${PORT} de momento...</p>
        `);  
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
