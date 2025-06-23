const express = require('express');
const router = express.Router();
const con = require('../servidor/database/db');
const { verificarLogin } = require('../middlewers/auth');
const carritoController = require('../controllers/carritoController');

router.get('/verCarrito', verificarLogin, (req, res) => {
    const id_usuario = req.session.user.id;

    const sql = `
        SELECT 
            cd.id AS id_carrito_detalle,
            p.id AS id_paquete, p.nombre, p.descripcion, p.precio_base,
            cd.cantidad, cd.precio_unitario, cd.cantidad_dias,

            a.marca AS auto_marca, a.modelo AS auto_modelo, a.precio AS precio_auto,
            e.nombre AS excursion_nombre, e.precio AS precio_excursion

        FROM carrito_detalle cd
        INNER JOIN carrito c ON cd.id_carrito = c.id
        INNER JOIN paquete p ON cd.id_paquete = p.id

        LEFT JOIN carrito_auto ca ON ca.id_detalle = cd.id
        LEFT JOIN auto a ON ca.id_auto = a.id

        LEFT JOIN carrito_excursion ce ON ce.id_detalle = cd.id
        LEFT JOIN excursion e ON ce.id_excursion = e.id

        WHERE c.id_usuario = ?
    `;

    con.query(sql, [id_usuario], (error, results) => {
        if (error) throw error;
        res.render('carrito', { results });
    });
});

//mostrar paquetes 



router.get('/index', (req, res) => {
    // Consulta de paquetes (sin inner join)
    con.query("SELECT * FROM paquete", (errorPaquete, paquetes) => {
        if (errorPaquete) throw errorPaquete;

        // Consulta de destinos por separado
        con.query("SELECT * FROM destino", (errorDestino, destinos) => {
            if (errorDestino) throw errorDestino;

            con.query("SELECT * FROM vuelo", (errorVuelo, vuelos) => {
                if (errorVuelo) throw errorVuelo;

                con.query("SELECT * FROM hotel", (errorHotel, hoteles) => {
                    if (errorHotel) throw errorHotel;

                    // Renderizar la vista con todos los datos separados
                    res.render('index', {
                        paquetes,
                        destinos,
                        vuelos,
                        hoteles,
                        user: req.session.user // si querés mostrar el nombre del usuario
                    });
                });
            });
        });
    });
});

router.get('/personalizarPaquete/:id_carrito_detalle', (req, res) => {
    const id = req.params.id_carrito_detalle;

    con.query('SELECT * FROM carrito_detalle WHERE id = ?', [id], (err, resultDetalle) => {
        if (err || resultDetalle.length === 0) return res.send("Error al buscar el detalle");
        con.query('SELECT * FROM excursion', (err2, excursiones) => {
            if (err2) return res.send("Error al buscar excursiones");

            con.query('SELECT * FROM auto', (err3, autos) => {
                if (err3) return res.send("Error al buscar autos");

                res.render('personalizarPaquete', {
                    detalle: resultDetalle[0],
                    excursiones,
                    autos
                });
            });
        });
    });
});


router.post('/agregarCarrito', verificarLogin, carritoController.agregarCarrito);
router.post('/guardarExtras',verificarLogin,carritoController.guardarExtras);
router.post('/confirmarCompra', verificarLogin, carritoController.confirmarCompra);
module.exports = router;