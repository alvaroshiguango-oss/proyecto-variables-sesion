const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mi-clave-secreta-super-segura',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // La sesión expira en 1 minuto para pruebas
}));

app.get('/', (req, res) => {
    if (req.session.usuario) {
        res.send(`
            <h1>Bienvenido, ${req.session.usuario}! 👋</h1>
            <p>Tu variable de sesión está activa.</p>
            <a href="/logout">Cerrar Sesión</a>
        `);
    } else {
        res.send(`
            <h1>No has iniciado sesión 🔒</h1>
            <form action="/login" method="POST">
                <input type="text" name="nombre" placeholder="Ingresa tu nombre" required>
                <button type="submit">Iniciar Sesión</button>
            </form>
        `);
    }
});

app.post('/login', (req, res) => {
    req.session.usuario = req.body.nombre; // Guardamos la variable de sesión
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send('Error al cerrar sesión');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});