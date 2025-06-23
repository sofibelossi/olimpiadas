const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudExcursion');
router.get('/listaExcursiones',(req,res)=>{
con.query("select * from excursion",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaExcursiones', { results: results });
    }
});
});
//crear registro
router.get('/altaExcursion',(req,res)=>{
res.render('altaExcursion');

router.post('/save',crud.save);
});
//modificar registro
router.get('/editarExcursion/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from excursion where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarExcursion', { excursion: results[0] });
        }
    });


});
router.post('/editarExcursion', crud.editarExcursion);
//eliminar registro
router.get('/eliminarExcursion/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as totalReserva from reserva_excursion where id_excursion =?", [id], (error1, results1) => {
        if (error1) {
            return res.status(500).send("Error al verificar la reserva");
        }

        

            const tieneReservas = results1[0].totalReserva > 0;
           
            if (tieneReservas) {
                return res.send("Esta excursion no puede eliminarse porque está en uso en una reserva.");
            }
            con.query("delete from excursion where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaExcursiones');
                }
            });
        });
    });

module.exports=router;