const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const con = require('../servidor/database/db');
const { verificarLogin, verificarAdmin } = require('../middlewers/auth');


//ruta del login
router.get('/login', (req, res) => {
    res.render('login');
});
//ruta del register
router.get('/register', (req, res) => {
    res.render('register');
});
//ruta del login admin
router.get('/loginAdmin', (req, res) => {
    res.render('login');
});
//ruta del register admin
router.get('/registerAdmin', (req, res) => {
    res.render('register');
});
//registro de un cliente
router.post('/register', async (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const password = req.body.password;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const zona = req.body.zona;
    let encriptada = await bcryptjs.hash(password, 8);

    con.query('insert into usuario set ?', { nombre: nombre, apellido: apellido, clave: encriptada, telefono: telefono, email: email, direccion: direccion, id_rol: 1, id_zona: zona }, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.send('cliente agregado con exito');
        }

    })
});
//login
router.post('/auth', async (req, res) => {
    
    const password = req.body.password;
    const email = req.body.email;

    if (password && email) {
        con.query('select * from usuario where email=?', [email], async (error, results) => {
            if (error) {
                return res.status(500).send('Error en la base de datos');
            } if (results.length === 0) {
                return res.send("Correo o clave incorrectas");
            }
            const usuario = results[0];
            const passwordCorrecta = await bcryptjs.compare(password, usuario.clave);
            if (!passwordCorrecta) {
                return res.send("Correo o clave incorrectas");
            }
            req.session.user = {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                id_rol: usuario.id_rol
            };
            if (usuario.id_rol == 2) {
                return res.redirect('/panelAdmin');
            } else {
                return res.redirect('/index');
            }
        });
    }
});

router.get('/logout', verificarLogin, (req, res) => {
    req.session.message = 'Sesión cerrada con exito';
    req.session.destroy((error) => {
        if (error) {
            console.log("Error al cerrar sesión");
            return res.send("Ocurrió un error al cerrar sesión");
        }
        res.redirect('/login');
    });
});
module.exports = router;