const express = require('express');
const router = express.Router();
const con = require('../servidor/database/db');
const crud = require('../controllers/crudAuto');
router.get('/listaAutos', (req, res) => {
    con.query("select * from auto", (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('listaAutos', { results: results });
        }
    });
});
//crear registro
router.get('/altaAuto', (req, res) => {
    res.render('altaAuto');

    router.post('/saveAuto', crud.saveAuto);
});
//modificar registro
router.get('/editarAuto/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from auto where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarAuto', { auto: results[0] });
        }
    });


});
router.post('/editarAuto', crud.editarAuto);
//eliminar registro
router.get('/eliminarAuto/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as totalRentas from auto_renta where id_auto =?", [id], (error1, results1) => {
        if (error1) {
            return res.status(500).send("Error al verificar la renta");
        }
        con.query("select count(*) as totalReservas from reserva_auto where id_auto =?", [id], (error2, results2) => {
            if (error2) {
                return res.status(500).send("Error al verificar la reseva");
            }


            const tieneRentas = results1[0].totalRentas > 0;
            const tieneReservas = results1[0].totalReservas > 0;

            if (tieneRentas || tieneReservas) {
                return res.send("Este auto no puede eliminarse porque está en uso por una renta o reserva.");
            }
            con.query("delete from auto where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaAutos');
                }
            });
        });
    });
});
module.exports = router;