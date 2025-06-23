const express = require('express');
const router = express.Router();
const con = require('../servidor/database/db');
const crud = require('../controllers/crudZona');
//listado
router.get('/listaZonas', (req, res) => {
    con.query("select * from zona", (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('listaZonas', { results: results });
        }
    });
});
//crear registro
router.get('/altaZona', (req, res) => {
    res.render('altaZona');
    router.post('/save', crud.save);
});
//modificar registro
router.get('/editarZona/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from zona where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarZona', { zona: results[0] });
        }
    });


});
router.post('/editarZona', crud.editarZona);
//eliminar registro
router.get('/eliminarZona/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as totalUsuarios from usuario where id_zona =?", [id], (error1, results1) => {
        if (error1) {
            return res.status(500).send("Error al verificar el usuario");
        }

        con.query("select count(*) as totalDestinos from destino where id_zona =?", [id], (error2, results2) => {
            if (error2) {
                return res.status(500).send("Error al verificar el destino");
            }

            const tieneUsuarios = results1[0].totalUsuarios > 0;
            const tieneDestinos = results2[0].totalDestinos > 0;
            if (tieneDestinos || tieneUsuarios) {
                return res.send("Esta zona no puede eliminarse porque está en uso por usuarios o destinos.");
            }
            con.query("delete from zona where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaZonas');
                }
            });
        });
    });
});




module.exports = router;