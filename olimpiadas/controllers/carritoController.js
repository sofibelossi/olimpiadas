const express = require('express');
const con = require('../servidor/database/db');
const { verificarLogin } = require('../middlewers/auth');

exports.agregarCarrito = ((req, res) => {

    const id_usuario = req.session.user.id;
    const cantidad = req.body.cantidad;
    const cantidad_personas = req.body.cantidad_personas;
    const cantidad_dias = req.body.cantidad_dias;
    const id_paquete = req.body.id_paquete;
    const id_hotel = req.body.id_hotel;
    const id_vuelo = req.body.id_vuelo;
    //buscar si el usuario ya tiene un carrito


    con.query("select id from carrito where id_usuario=?", [id_usuario], (error, results) => {
        if (error) {
            res.send("error al buscar el carrito");
        }
        let id_carrito;
        if (results.length > 0) {
            id_carrito = results[0].id;
            insertarDetalle();
        } else {//si no existe el carrito hay que crearlo
            con.query("insert into carrito set ?", { id_usuario: id_usuario, fecha_creacion: new Date() }, (error, results) => {
                if (error) {
                    res.send("error al crear carrito");
                }
                id_carrito = results.insertId;
                insertarDetalle();
            });
        }
        function insertarDetalle() {
            con.query("select precio_base from paquete where id=?", [id_paquete], (error, results) => {
                if (error || results.length === 0) {
                    console.log(error || 'Paquete no encontrado');
                    return res.status(500).send('Error al obtener precio del paquete');
                }
                const precio_base = results[0].precio_base;
                const precio_total = precio_base * cantidad * cantidad_personas  * cantidad_dias;//* id_vuelo * id_hotel;//aca esto ultimo no va a funcionar, hay q recuperar los precios

                con.query("insert into carrito_detalle set ?", { id_carrito: id_carrito, id_paquete: id_paquete, cantidad: cantidad, cantidad_personas: cantidad_personas, cantidad_dias: cantidad_dias, precio_unitario: precio_total, id_vuelo: id_vuelo, id_hotel: id_hotel }, (error, results) => {
                    if (error) {
                        throw error;
                    } else {
                        res.redirect('/verCarrito');
                    }
                });
            })
        }
    });
    //

});

exports.guardarExtras = (req, res) => {
    const { id_detalle, id_excursion, id_auto } = req.body;

    // 1. Insertar excursión si fue seleccionada
    if (id_excursion && id_excursion !== '') {
        con.query(
            'INSERT INTO carrito_excursion (id_detalle, id_excursion) VALUES (?, ?)',
            [id_detalle, id_excursion],
            (err) => {
                if (err) console.error('Error insertando excursión:', err);
            }
        );
    }

    // 2. Insertar auto si fue seleccionado
    if (id_auto && id_auto !== '') {
        con.query(
            'INSERT INTO carrito_auto (id_detalle, id_auto) VALUES (?, ?)',
            [id_detalle, id_auto],
            (err) => {
                if (err) console.error('Error insertando auto:', err);
            }
        );
    }

    // 3. Redirigir al carrito actualizado
    res.redirect('/verCarrito');
};

exports.confirmarCompra = ((req, res) => {
    let paquetes = req.body.paquetes;
    const id_usuario = req.session.user.id;
    const fecha_inicio = new Date(req.body.fecha_inicio);

    if (!paquetes) {
        return res.send('No seleccionaste ningún paquete');
    }

    if (!Array.isArray(paquetes)) paquetes = [paquetes];
    const placeholders = paquetes.map(() => '?').join(',');

    const sql = `
        SELECT cd.id AS id_carrito_detalle, cd.id_paquete, cd.cantidad_dias, cd.precio_unitario
        FROM carrito_detalle cd
        INNER JOIN carrito c ON c.id = cd.id_carrito
        WHERE c.id_usuario = ? AND cd.id_paquete IN (${placeholders})
    `;

    con.query(sql, [id_usuario, ...paquetes], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener detalles del carrito");
        }

        let responded = false;
        let insertCount = 0;

        results.forEach((item) => {
            const fecha_fin = new Date(fecha_inicio);
            fecha_fin.setDate(fecha_inicio.getDate() + item.cantidad_dias);

            // Insertar en reserva
            con.query(
                `INSERT INTO reserva (id_usuario, id_paquete, fecha_inicio, fecha_fin, estado, precio_total)
                 VALUES (?, ?, ?, ?, 'pendiente', ?)`,
                [id_usuario, item.id_paquete, fecha_inicio, fecha_fin, item.precio_unitario],
                (err, result) => {
                    if (err) {
                        console.error(`Error insertando el paquete ${item.id_paquete}:`, err);
                        if (!responded) {
                            responded = true;
                            return res.status(500).send("Error al guardar la reserva");
                        }
                        return;
                    }

                    const idDetalle = item.id_carrito_detalle;

                    // Eliminar extras primero
                    con.query("DELETE FROM carrito_auto WHERE id_detalle = ?", [idDetalle]);
                    con.query("DELETE FROM carrito_excursion WHERE id_detalle = ?", [idDetalle]);

                    // Luego eliminar el detalle del carrito
                    con.query("DELETE FROM carrito_detalle WHERE id = ?", [idDetalle], (err2) => {
                        if (err2) {
                            console.error("Error al eliminar del carrito:", err2);
                        }

                        insertCount++;
                        if (insertCount === results.length && !responded) {
                            responded = true;
                            res.send("¡Compra confirmada! Estado: pendiente de aprobación");
                        }
                    });
                }
            );
        });
    });
});


